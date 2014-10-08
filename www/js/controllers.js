angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ProductsCtrl', function($scope, Catalog) {
  $scope.products = [];

  Catalog.all().then(function(page) {
    $scope.products = page.products;
  });
})

.controller('ProductDetailCtrl', function($scope, $stateParams, $timeout, Cart, Catalog) {
  $scope.product = {};
  $scope.adding = false;

  Catalog.get($stateParams.productId)
         .then(function(product) {
           $scope.product = product;
         });

  $scope.addToCart = function() {
    $scope.adding = true;

    $timeout(function() {
      Cart.add($scope.product);
      $scope.adding = false;
    }, 2000);
  };
})

.controller('AccountCtrl', function($scope) {
})

.controller('HeaderCtrl', function($scope, Cart, $ionicSideMenuDelegate) {
  $scope.cart = Cart;

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
});
