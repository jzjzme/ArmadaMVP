                                                  $("#order-product").click(function() {
  var _productId = $("#order-product-id").val();
  axios.get("/order/" + _productId).then(function(resp) {
    //alert(JSON.stringify(resp));
     qr.value = _productId;.data.orderId;
  });

 
});

$("#checkpoint").click(function() {
  var _productId = $("#checkpoint-product-id").val();
  var _checkpointId = $("#checkpoint-id").val();


  axios.get("/order/" + _productId + "/checkpoint/" + _checkpointId).then(function(resp) {
    alert(JSON.stringify(resp));
  });
});

var qr = new QRious({
        element: document.getElementById('qr'),
        value: ''
      });