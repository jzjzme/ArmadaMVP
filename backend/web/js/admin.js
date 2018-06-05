  

var qr = new QRious({
        element: document.getElementById('qr'),
        value: ''
      });

$("#order-product").click(function() {
  var _productId = $("#order-product-id").val();
  axios.get("/order/" + _productId).then(function(resp) {
    console.log(JSON.stringify(resp));
    console.log(JSON.stringify(resp.data));
    alert(resp.data.orderId);
     qr.value = resp.data.orderId;
  });

 
});

$("#checkpoint").click(function() {
  var _productId = $("#checkpoint-product-id").val();
  var _checkpointId = $("#checkpoint-id").val();


  axios.get("/order/" + _productId + "/checkpoint/" + _checkpointId).then(function(resp) {
    alert(JSON.stringify(resp));
  });
});
