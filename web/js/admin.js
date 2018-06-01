$("#order-product").click(function() {
  var _productId = $("#order-product-id").val();
  axios.get("http://localhost:3000/order/" + _productId).then(function(resp) {
    alert(JSON.stringify(resp));
  });

  alert("order product " + _productId);
});

$("#checkpoint").click(function() {
  var _productId = $("#checkpoint-product-id").val();
  var _checkpointId = $("#checkpoint-id").val();


  axios.get("http://localhost:3000/order/" + _productId + "/checkpoint/" + _checkpointId).then(function(resp) {
    alert(JSON.stringify(resp));
  });
});