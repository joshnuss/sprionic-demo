angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ProductsCtrl', function($scope, Catalog) {
  $scope.products = [];
  $scope.page = 0;
  $scope.moreAvailable = true;

  function partition(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

  $scope.loadMore = function() {
    Catalog.all($scope.page+1).then(function(page) {
      page.products.forEach(function(product) {
        $scope.products.push(product);
      });
      $scope.partitioned = partition($scope.products, 3);
      $scope.page = Number(page.current_page);
      $scope.moreAvailable = $scope.products.length < Number(page.total_count);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
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
