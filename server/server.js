require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const {Game} = require('./Game.js');

const port = process.env.PORT;

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
var parser = cookieParser.apply(null, arguments);

io.use(function (socket, next) {
  parser(socket.request, null, next);
});
io.on('connection', function(socket){

  // SKRIFA AUTHENTICATED SOCKETS HER FYRIR ADMIN
  try {

  } catch (e) {

  }
  console.log(socket.request.cookies)
  // NOTA SOCKET.REQUEST.COOKIES FYRI THAD

  console.log('a user connected: ', socket.id);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('joinGame', function(msg) {  
    if (games[msg.roomName]) {
      socket.join(msg.roomName);

      // Bæta við data hérna
      socket.emit('res', {
        code: 'joinGameSuccess',

      });
      return;
    }

    socket.emit('res', {
      code: 'joinGameFailure',
      data: []
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
