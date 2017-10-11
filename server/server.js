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
let clients = [];
let questions = ['q1', 'q2'];
let game;

io.on('connection', function(socket){
  clients.push(socket);
  console.log('a user connected: ', socket.id);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    var index = clients.indexOf(socket.id);
    clients.splice(index,1);
  });

  socket.on('stateChange', function(msg) {
    if (msg === 'gameStart') {
      game = new Game(questions);
      game.start();
    }
    if (msg === 'nextQuestion') {

      let payload = game.nextQuestion();

      if (payload.state !== 'PLAY') return;
      io.emit('newQuestion', payload.data);
    }
  });

});

http.listen(port, () => {
  console.log(`Started on port ${port}`);
})
