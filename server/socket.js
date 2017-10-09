const WebSocket = require('ws');
const url = require('url');

let start = (server) => {
    const wss = new WebSocket.Server({server});

    function heartbeat() {
        this.isAlive = true;
    }

    function printClients() {
      wss.clients.forEach(function each(client) {
        // if (client !== ws && client.readyState === WebSocket.OPEN) {
        if (client.readyState === WebSocket.OPEN) {
          // client.send(data);
        } else {
          console.log('socket not open');
        }
      });
    };

    wss.on('connection', function connection(ws, req) {
        console.log('connected', ws);
        ws.send('Welcome user')
        const location = url.parse(req.url, true);
        // You might use location.query.access_token to authenticate or share sessions
        // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

        ws.on('close', function close() {
            console.log('disconnected');
        });

        ws.on('message', function incoming(message) {
          console.log('Socket Message: ', message);
        });

        ws.isAlive = true;
        ws.on('pong', heartbeat);

        const interval = setInterval(function ping() {
            wss.clients.forEach(function each(ws) {
                if (ws.isAlive === false) {
                    console.log('Stale connection terminating.');
                    return ws.terminate();
                }

                ws.isAlive = false;
                ws.ping('', false, true);
            });
        }, 10000);




    });

    return wss;
};

module.exports = {start};
