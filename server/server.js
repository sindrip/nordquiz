const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const {Game} = require('./Game.js');

const port = process.env.PORT || 3000;

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// ADMIN ROUTES
const admin = require('./routes/admin');
app.use('/admin', admin);

// PUBLIC SERVE
app.use(express.static('public'));

// GAMES
let questions = ['q1', 'q2'];
let games = {};

// SOCKETS
io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('joinGame', function(msg) {
    if (games[msg.roomName]) {
      socket.join(msg.roomName);

      socket.emit('res', {
        code: 'joinGameSuccess',
        
      });
      return;
    }

    socket.emit('res', {
      code: 'joinGameFailure'

    });
  });

  socket.on('stateChange', function(msg) {
    if (msg.command === 'gameStart') {
      games[msg.name] = new Game(questions);
      games[msg.name].start();
    }

    if (msg.command === 'nextQuestion') {

      let payload = games[msg.name].nextQuestion();

      if (payload.state !== 'PLAY') return;
      io.to(msg.name).emit('newQuestion', payload.data);
    }
  });

});

http.listen(port, () => {
  console.log(`Started on port ${port}`);
})
