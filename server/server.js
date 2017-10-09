const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const socket = require('./socket');

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
let gameStatus = 'pregame';
let number = 0;
let questions = ['spurning 1', 'spurning 2'];

io.on('connection', function(socket){
  clients.push(socket.id);
  console.log('a user connected: ', socket.id);
  socket.emit('status', gameStatus);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    var index = clients.indexOf(socket.id);
    clients.splice(index,1);
  });

  socket.on('stateChange', function(msg) {
    console.log(msg);
    if (msg === 'gamestart') {
      gameStatus = msg;
    } else if (msg === 'nextquestion') {
      console.log('next')
    }


  });

});

http.listen(port, () => {
  console.log(`Started on port ${port}`);
})
