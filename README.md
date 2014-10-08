# Spree + Ionic Android/iOS Demo

This is a toy project for playing with Spree/ionic integration

Links:

- Spree: http://spreecommerce.com
- Ionic: http://ionicframework.com
- Angular.js: http://angularjs.org
- ngCordova: http://ngcordova.com

## Installation

### Setup a Spree demo site

```
rails new ionic-store
cd ionic-store
spree install --auto-accept
```

### Add CORS

The Spree API needs to allow cross domain access, for that we'll need CORS headers in all API responses.

To do that, open your `Gemfile` and add:

```
gem 'rack-cors', require: 'rack/cors'
```

Then run bundler:

```
bundle
```

In your `config.ru`, add the cors middleware:

```
use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: %i(get post delete put options head)
  end
end
```

Start a rails server on an IP your phone can access:

```
rails server -b 192.168.X.Y
```

### Install node.js packages

Install cordova and ionic

```
npm install -g cordova ionic gulp
cd sprionic-demo && npm install
```

### Install Android/iOS dev tools

For Android, install stand alone dev tools, and android-19 packages:

https://developer.android.com/sdk/installing/index.html

For iOS, install XCode:

https://developer.apple.com/xcode/downloads/

## Development

Watch .coffee and .scss, and run app in local browser with live-reload:

```
gulp watch
ionic serve
```

## Test on device

### Android

Enable development mode on your device (click Settings -> About -> Click on build number 7 times)

```
ionic run android --device
```

### iOS

TBD

## Build

```
ionic build android
ionic build ios
```
