const express = require('express')
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('web'));

var products = require('./products.json');

/* Format: [{"id":123, "itemId":234, "checkpoints":[]}]*/
var orders = [];

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/products', (req, res) => res.send(products))

/* 
Generate the data describing the path of a given product, eg
[{name: 'Kowloon warehouse', id:'23'}, {name: 'Hong Kong post office', id:'55'}, {name: 'US post office', id:'498324-99'}]
*/
var getPathForProduct = function(productId, orderId) {
  var path = [];
  path.push({"name": "Kowloon warehouse", "id": "0", "verified": false});
  path.push({"name": "Hong Kong post office", "id":"1", "verified": false});
  path.push({"name": "Customer received", "id":"2", "verified": false});
  return path;
}

/*
Go through an order path, and if the checkpointId is found, set verified true. Return new path.
*/
var markCheckpoint = function(path, checkpointId) {
  console.log("In path " + JSON.stringify(path) + " mark " + checkpointId);
  path.forEach(function(part, index, array) {
    // Check the checkpointId
    if (array[index].id == checkpointId) {
      array[index].verified = true;
    }
  });
  console.log("return " + JSON.stringify(path));
  return path;
}

// Order instance of product 'productId'
app.get('/order/:id', (req, res) => {
  var _orderId = Date.now()
  var _itemId = req.params.id;
  var _path = getPathForProduct(_itemId, _orderId);
  orders.push({
    id: _orderId,
    itemId: _itemId,
    checkpoints: [],
    path: _path
  });
  res.send({"orderId": _orderId});
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

  // Identify the matching order id if it exists, and add the checkpoint
  orders.forEach(function(part, index, array) {
    if (array[index].id == _order) {
      found = true;
      console.log("Found product: " + array[index]);
      array[index].checkpoints.push(_checkpoint);

      // Also scan through the product path, and mark checkpoint as verified
      array[index].path = markCheckpoint(array[index].path, _checkpoint);
    }
  });

  if (!found) {
    console.log("Order not found!!!");
  }

  res.send(orders)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))