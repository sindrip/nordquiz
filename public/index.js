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

    document.getElementById('byrjaleik').onclick = () => {
      console.log('admin byrja leik');
      socket.emit('stateChange', 'gamestart');
    };

    document.getElementById('naestaspurning').onclick = () => {
      console.log('admin naesta spurning');
      socket.emit('stateChange', 'nextquestion');
    };


  }

  return {
    init,
  };
})();
