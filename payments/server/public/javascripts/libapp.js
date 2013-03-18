var pay = function pay (cbPtr) {
  window.pay(function paymentReceived (data) {
    FUNCTION_TABLE[cbPtr](data);
  });
};

var log_to_screen = function log_to_screen (msg) {
  var msgEle = document.getElementById('msg');
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(msg));
  msgEle.insertBefore(p, msgEle.firstElementChild);
};

var lib = {
  pay: pay,
  log_to_screen: log_to_screen
};

mergeInto(LibraryManager.library, lib); // needed for emscripten