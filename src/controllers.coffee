angular.module("sprionic.controllers", [])

  .controller "DashCtrl", ($scope) ->
    return

  .controller "ProductsCtrl", ($scope, Catalog) ->
    partition = (arr, size) ->
      newArr = []
      i = 0

      while i < arr.length
        newArr.push arr.slice(i, i + size)
        i += size
      newArr

    $scope.products = []
    $scope.page = 0
    $scope.moreAvailable = true
    $scope.loadMore = ->
      Catalog.all($scope.page + 1).then (page) ->
        page.products.forEach (product) ->
          $scope.products.push product

        $scope.partitioned = partition($scope.products, 3)
        $scope.page = Number(page.current_page)
        $scope.moreAvailable = $scope.products.length < Number(page.total_count)
        $scope.$broadcast "scroll.infiniteScrollComplete"

  .controller "ProductDetailCtrl", ($scope, $stateParams, $timeout, $ionicLoading, Cart, Catalog) ->
    $scope.product = {}
    $scope.images = []
    $scope.adding = false

    $scope.loading = true
    $ionicLoading.show({template: "Loading..."})

    Catalog.get($stateParams.productId).then (product) ->
      $scope.product = product
      $scope.images = product.master.images
      $ionicLoading.hide()
      $scope.loading = false

    $scope.addToCart = ->
      $scope.adding = true

      $timeout((->
        Cart.add $scope.product
        $scope.adding = false
      ), 2000)

  .controller "CartCtrl", ($scope, Cart) ->
    $scope.cart = Cart

  .controller "AccountCtrl", ($scope) ->
    return

  .controller "HeaderCtrl", ($scope, Cart, $ionicSideMenuDelegate) ->
    $scope.cart = Cart
    $scope.toggleLeft = ->
      $ionicSideMenuDelegate.toggleLeft()

    $scope.toggleRight = ->
      $ionicSideMenuDelegate.toggleRight()
