window.addEventListener('DOMContentLoaded', function () {
  var $ = document.getElementById.bind(document),
      msgEle = $('msg'),
      getTokenEle = $('getToken'),
      getPostbackEle = $('getPostback'),
      tokenLoc = window.location + 'token',
      token = null,
      socket = io.connect(window.location.origin),
      requestTokenLock = false,
      log = function (msg) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(msg));
        msgEle.insertBefore(p, msgEle.firstElementChild);
      },
      ajaxPost = function (loc, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = cb;
        xhr.open('POST', loc);
        xhr.send();
      },
      wsRequest = function (cb) {
        
      },
      requestToken = function (cb) {
        if (!requestTokenLock) {
          requestTokenLock = true;
          socket.once('tokenResponse', function (data) {
            cb(data);
            requestTokenLock = false;
          });
          socket.emit('tokenRequest');
          log('emitted tokenRequest');
        }
      };

  socket.on('connect', function () {
    log('ws connection established');
  });

  socket.on('postback', function (data) {
    log(data);
  });

  getTokenEle.addEventListener('click', function () {
    log('Requesting token');
    requestToken(function (data) {
      log(data);
      token = data;
      getPostbackEle.removeAttribute('disabled');
    });
  });

  getPostbackEle.addEventListener('click', function () {
    getPostbackEle.setAttribute('disabled', 'true');
    log('Requesting mozPay');
    try {
      var request = navigator.mozPay([token]);
      request.onsuccess = function() {
        log('navigator.mozPay() finished');
        // The product has not yet been bought!
        // Poll your server until a valid postback has been received.
        //waitForPostback();
      }
      request.onerror = function() {
        log('navigator.mozPay() error: ' + this.error.name);
      };
    } catch (e if e instanceof TypeError) {
      log(e.message);
    }
  });

  $('clear').addEventListener('click', function () {
    msgEle.innerHTML = '';
  });
});
