const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {Game} = require('./Game.js');

const port = process.env.PORT || 3000;

// const app = express();
// const server = require('http').Server(app);
// const wss = socket.start(server);
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(morgan('dev'));

// PUBLIC SERVE
app.use(express.static('public'));

// SOCKET
// let clients = [];
let questions = ['q1', 'q2'];

let games = {};

io.on('connection', function(socket){
  // clients.push(socket);
  console.log('a user connected: ', socket.id);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    // var index = clients.indexOf(socket.id);
    // clients.splice(index,1);
  });

  socket.emit('init','da')

  socket.on('joinGame', function(msg) {
    if (games[msg]) {
      socket.join(msg);

      socket.emit('res', 'joinGameSuccess');
      return;
    }

    socket.emit('res', 'joinGameFailure');
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
