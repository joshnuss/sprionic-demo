angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation) {
   $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      $scope.position = position;
    }, function(err) {
      // error
    });

  // begin watching
  var watch = $cordovaGeolocation.watchPosition({ frequency: 1000 });
  watch.promise.then(function() { /* Not  used */ }, 
    function(err) {
      // An error occurred.
    }, 
    function(position) {
      $scope.position = position;
      // Active updates of the position here
      // position.coords.[ latitude / longitude]
  });

  // clear watch
  $cordovaGeolocation.clearWatch(watch.watchId)
})

.controller('ProductsCtrl', function($scope, Catalog) {
  $scope.products = Catalog.all();
})

.controller('ProductDetailCtrl', function($scope, $stateParams, $timeout, Cart, Catalog) {
  $scope.product = Catalog.get($stateParams.productId);
  $scope.adding = false;

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
