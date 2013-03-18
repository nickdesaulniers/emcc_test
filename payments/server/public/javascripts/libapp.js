var pay = function pay (cbPtr) {
  window.pay(function paymentReceived (data) {
    FUNCTION_TABLE[cbPtr](data);
  });
};

var draw_image = function draw_image (msg) {
  var img = document.createElement('img');
  img.src = msg;
  document.getElementById('msg').appendChild(img);
};

var lib = {
  pay: pay,
  draw_image: draw_image
};

mergeInto(LibraryManager.library, lib); // needed for emscripten