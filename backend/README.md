## Armada backend

Responsible for tracking an order as it moves between factories, warehouses, and finally to the end user.

Endpoints:

- Order product
- Scan order at checkpoint
- Get all active orders, including tracking information

-----------------------

### Order product

> /order/:productId

Order a new product, where _productId_ is an integer representing the product. Returns an order ID which can be used to generate a QR code representing the product.

Example call:
> http://206.189.90.181:3000/order/23

Example response:
> {"orderId:":1528097481789}


### Scan order at checkpoint

> /orders/:orderId/checkpoint/:checkpointId

Scan order _orderId_ at checkpoint _checkpointId_

Example call:
> http://206.189.90.181:3000/order/1528097481789/checkpoint/23

Example response: 
> [{"id":1528097481789,"itemId":"23","checkpoints":["23"]}]


### Get all orders, including tracking information

> /orders

Returns a list of all orders currently being tracked. For each order, the _itemId_ is included, along with any checkpoints (if any) it's been checked in at.

Example call:
> http://206.189.90.181:3000/orders

Example response:
> [{"id":1528097481789,"itemId":"23","checkpoints":["23"]}]


### To run
```
npm install
node server.js
```