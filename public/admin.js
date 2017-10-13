document.addEventListener('DOMContentLoaded', () => {
    AdminPage.init();
  });
  
  let AdminPage = (() => {
    let socket;
  
    let init = () => {
      socket = io();
  
      socket.on('res', function(msg) {
        console.log('res')
        console.log(msg);
      });
      
      document.getElementById('byrjaleik').onclick = () => {
        console.log('admin byrja leik');
        socket.emit('admin', {
          command: 'gameStart',
          name: 'nordquiz',
        });
      };
  
      document.getElementById('naestaspurning').onclick = () => {
        console.log('admin naesta spurning');
        socket.emit('admin', {
          command: 'nextQuestion',
          name: 'nordquiz',
        });
      };

      document.getElementById('getGame').onclick = () => {
        socket.emit('admin', {
          command: 'getGame',
          name: 'nordquiz',
        });
      };
  
    }
  
    return {
      init,
    };
  })();
  