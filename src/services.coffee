###*
A simple example service that returns some data.
###
angular.module("sprionic.services", [])
  .constant("Env",
    domain: "http://192.168.0.101:3000"
    token: "033ab5d925381b932d566fe86b010ce5802f7b1e601f460c"
  )
.factory "Cart", ->
  service =
    lines: []
    add: (product) ->
      line = service.findProduct(product)
      if line
        line.quantity += 1
      else
        service.lines.push
          product: product
          quantity: 1

    findProduct: (product) ->
      for index of service.lines
        line = service.lines[index]
        return line  if line.product is product

    total: ->
      amount = 0
      for index of service.lines
        line = service.lines[index]
        amount += line.product.price * line.quantity
      amount

    totalQuantity: ->
      quantity = 0

      for index of service.lines
        line = service.lines[index]
        quantity += line.quantity

      quantity

    empty: ->
      @lines = []

  service

.factory "Catalog", ($http, Env) ->
  absoluteUrl = (url) ->
    if url.match(/^http/)
      url
    else
      Env.domain + url

  updateVariantImageUrls = (variant) ->
    variant.images.forEach (image) ->
      image.large_url = absoluteUrl(image.large_url)
      image.mini_url = absoluteUrl(image.mini_url)
      image.small_url = absoluteUrl(image.small_url)
      image.product_url = absoluteUrl(image.product_url)

  updateProductImageUrls = (product) ->
    product.variants.forEach updateVariantImageUrls
    updateVariantImageUrls product.master

  all: (page) ->
    page = page or 1
    $http.get(Env.domain + "/api/products",
      params:
        page: page
        per_page: 9
    ).then (response) ->
      response.data.products.forEach updateProductImageUrls
      response.data


  get: (slug) ->
    $http.get(Env.domain + "/api/products/" + slug).then (response) ->
      updateProductImageUrls response.data
      response.data
