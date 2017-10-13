require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

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
let game;

// SOCKETS
var parser = cookieParser.apply(null, arguments);

io.use(function (socket, next) {
  parser(socket.request, null, next);
});
io.on('connection', function(socket){
  let decoded;
  try {
    decoded = jwt.verify(socket.request.cookies.jwtToken, process.env.JWT_SECRET);
    socket.isAdmin = true;
  } catch (e) {
    socket.isAdmin = false;
  }
  
  socket.on('admin', function(msg) {
    if (!socket.isAdmin) return;

    if (msg.command === 'gameStart') {
      game = new Game(questions);
      game.start();
    }


    if (msg.command === 'nextQuestion') {

      let payload = game.nextQuestion();

      if (payload.state !== 'PLAY') return;
      
      io.to('nordquiz').emit('newQuestion', payload.data);
    }

    if (msg.command === 'getGame') {
      socket.emit('res', game);
    }
  });

  socket.on('joinGame', function(msg) {  
    if (game && msg.roomName === 'nordquiz') {
      socket.playerName = msg.playerName;

      socket.join(msg.roomName);

      // Bæta við data hérna
      socket.emit('res', {
        code: 'joinGameSuccess',
        roomName: msg.roomName,
        data: [],
      });
      return;
    }

    socket.emit('res', {
      code: 'joinGameFailure',
      data: []
    });
  });

  socket.on('answerQuestion', function(msg) {
    game.answerQuestion(socket.playerName, msg.questionNumber, msg.answer);
  });

});

http.listen(port, () => {
  console.log(`Started on port ${port}`);
})
