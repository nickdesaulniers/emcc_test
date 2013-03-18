window.addEventListener('DOMContentLoaded', function () {
  var token = null,
      socket = io.connect(window.location.origin),
      requestTokenLock = false,
      requestToken = function (cb) {
        if (!requestTokenLock) {
          requestTokenLock = true;
          socket.once('tokenResponse', function (data) {
            cb(data);
            requestTokenLock = false;
          });
          socket.emit('tokenRequest');
        }
      };

  // hook for emscripten code
  window.pay = function pay (cb) {
    requestToken(function tokenReceived (token) {
      socket.once('postback', function postbackReceived (data) {
        cb(data);
      });
      navigator.mozPay([token]);
    });
  };

  // lazy load emscripten code after setting up hooks
  var script = document.createElement('script');
  script.src = 'javascripts/a.out.js';
  document.head.appendChild(script);
});
