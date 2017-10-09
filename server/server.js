const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

// PUBLIC SERVE
app.use(express.static('public'));

http.listen(port, () => {
  console.log(`Started on port ${port}`);
})
