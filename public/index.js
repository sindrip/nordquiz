document.addEventListener('DOMContentLoaded', () => {
  Page.init();
});

let Page = (() => {
  let socket;

  let init = () => {
    socket = io();

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

    document.getElementById('joinroom').onclick = (e) => {
      e.preventDefault();
      console.log('joinroom');
      const roomName = document.getElementById('joinRoomTexti').value;
      const teamName = '1234';
      const teamCode = '4321';
      socket.emit('joinGame', {
        roomName,
        teamName,
        teamCode,
      });
    };

  }

  return {
    init,
  };
})();
