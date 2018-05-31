

var vueProducts = new Vue({
  el: '#product-parent',
  data: {
    products: []
  }
})

axios.get("http://localhost:3000/products").then(function (result) {
  console.log(JSON.stringify(result.data));

  vueProducts.products = result.data.products;
  //vueProducts.$set('products', products.data.products);
});

