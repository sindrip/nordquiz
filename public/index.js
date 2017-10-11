document.addEventListener('DOMContentLoaded', () => {
  Page.init();
});

let Page = (() => {
  let socket;

  let init = () => {
    socket = io();

    socket.emit()

    socket.on('status', function(msg) {
      console.log(msg);
    });

    socket.on('newQuestion', function(msg) {
      console.log('test')
      document.getElementById('output').innerHTML  += '\n' + msg;
    });

    socket.on('res', function(msg) {
      console.log(msg);
    });

    document.getElementById('byrjaleik').onclick = () => {
      console.log('admin byrja leik');
      socket.emit('stateChange', {
        command: 'gameStart',
        name: 'testName',
      });
    };

    document.getElementById('naestaspurning').onclick = () => {
      console.log('admin naesta spurning');
      socket.emit('stateChange', {
        command: 'nextQuestion',
        name: 'testName',
      });
    };

    document.getElementById('joinroom').onclick = (e) => {
      e.preventDefault();
      console.log('joinroom');
      const roomName = document.getElementById('joinRoomTexti').value;
      socket.emit('joinGame', {
        roomName,
      });
    };

  }

  return {
    init,
  };
})();
