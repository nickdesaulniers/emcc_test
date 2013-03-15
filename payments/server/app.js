
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , pay = require('mozpay');

//var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger('dev'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// -- Added --------------------------------------------------------------------
pay.configure({
  // application key from marketplace
  mozPayKey: '46e74e56-9247-4594-aaf4-331c8ed0aeea', // dev key
  // application secret from marketplace
  mozPaySecret: '73f5a3ac1d6594c1191a7dbfe8e47bab2e2d994db4a5a11978e073abbbf4c1b525982010cde925934e47f04f43fbe5f3', // dev secret
  mozPayAudience: 'marketplace.firefox.com',
  // Makes postbacks available at https://yourapp/mozpay/postback
  mozPayRoutePrefix: '/mozpay',
  mozPayType: 'mozilla/payments/pay/v1'
});

app.post('/token', function (req, res) {
  console.log('got a token request');
  res.send(pay.request({
    id: 'your-unique-product-id',
    name: 'Your Product',
    description: 'A little bit more about the product...',
    pricePoint: 1,  // Consult the Firefox Marketplace price points for details.
                    // This expands to a price/currency at the time of payment.
    productData: 'session_id=xyz',  // You can track whatever you like here.
    // These must be absolute URLs like what you configured above.
    postbackURL: 'http://lostoracle.net:' + app.get('port') + '/mozpay/postback',
    chargebackURL: 'http://lostoracle.net:' + app.get('port') + '/mozpay/chargeback',
    simulate: {
      result: 'postback'
    }
  }));
});

pay.on('postback', function(data) {
  console.log('product ID ' + data.request.id + ' has been purchased');
  console.log('Transaction ID: ' + data.response.transactionID);
});

pay.on('chargeback', function(data) {
  console.log('product ID ' + data.request.id + ' failed');
  console.log('reason: ' + data.response.reason);
  console.log('Transaction ID: ' + data.response.transactionID);
});

pay.routes(app);

// -----------------------------------------------------------------------------

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// -----------------------------------------------------------------------------

var io = require('socket.io').listen(server);

//io.set('log level', 0);

io.sockets.on('connection', function (socket) {
  console.log('connection received');

  socket.on('tokenRequest', function () {
    console.log('got a token request');
    socket.emit('tokenResponse', pay.request({
      id: 'your-unique-product-id',
      name: 'Your Product',
      description: 'A little bit more about the product...',
      pricePoint: 1,  // Consult the Firefox Marketplace price points for details.
                      // This expands to a price/currency at the time of payment.
      productData: 'session_id=xyz',  // You can track whatever you like here.
      // These must be absolute URLs like what you configured above.
      postbackURL: 'http://lostoracle.net/mozpay/postback',
      chargebackURL: 'http://lostoracle.net/mozpay/chargeback',
      simulate: {
        result: 'postback'
      }
    }));
  });
});

