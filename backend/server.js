const express = require('express')
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var products = require('./products.json');

/* Format: [{"id":123, "itemId":234, "checkpoints":[]}]*/
var orders = [];

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/products', (req, res) => res.send(products))

// Order instance of product 'productId'
app.get('/order/:id', (req, res) => {
  var _orderId = Date.now()
  var _itemId = req.params.id;
  orders.push({
    id: _orderId,
    itemId: _itemId,
    checkpoints: []
  });
  res.send({"orderId:": _orderId});
})

// Get all orders
app.get('/orders', (req, res) => {
  res.send(orders)
})

// Checkin order 'orderId' at checkpoint 'checkpoint'
app.get('/order/:id/checkpoint/:checkpoint', (req, res) => {
  var _order = req.params.id;
  var _checkpoint = req.params.checkpoint;
  var found = false;

  orders.forEach(function(part, index, array) {
    if(array[index].id == _order) {
      found = true;
      console.log("Found product: " + array[index]);
      array[index].checkpoints.push(_checkpoint);
    }
  });

  if (!found) {
    console.log("Order not found!!!");
  }

  res.send(orders)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))