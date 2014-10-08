angular.module('starter.services', [])

.constant('Env', {
  domain: "http://192.168.0.101:3000",
  token: '033ab5d925381b932d566fe86b010ce5802f7b1e601f460c'
})

.factory('Cart', function() {
  service = {
    lines: [],

    add: function(product) {
      line = service.findProduct(product);

      if (line) {
        line.quantity += 1;
      }
      else {
        service.lines.push({product: product, quantity: 1});
      }
    },

    findProduct: function(product) {
      for (index in service.lines) {
        var line = service.lines[index];

        if (line.product == product)
          return line;
      }
    },

    total: function() {
      var amount = 0;

      for (index in service.lines) {
        var line = service.lines[index];
        amount += line.product.price * line.quantity;
      }

      return amount;
    }
  };

  return service;
})
/**
 * A simple example service that returns some data.
 */
.factory('Catalog', function($http, Env) {
  var absoluteUrl = function(url) {
    if (url.match(/^http/))
      return url;
    else
      return Env.domain + url;
  };

  var updateVariantImageUrls = function(variant) {
    variant.images.forEach(function(image) {
      image.large_url = absoluteUrl(image.large_url);
      image.mini_url = absoluteUrl(image.mini_url);
      image.small_url = absoluteUrl(image.small_url);
      image.product_url = absoluteUrl(image.product_url);
    });
  };

  var updateProductImageUrls = function(product) {
    product.variants.forEach(updateVariantImageUrls);
    updateVariantImageUrls(product.master);
  };

  return {
    all: function() {
      return $http.get(Env.domain + '/api/products')
                  .then(function(response) {
                    response.data.products.forEach(updateProductImageUrls);
                    return response.data;
                  });
    },
    get: function(slug) {
      return $http.get(Env.domain + '/api/products/' + slug)
                  .then(function(response) {
                    updateProductImageUrls(response.data);
                    return response.data;
                  });
    }
  }
});
