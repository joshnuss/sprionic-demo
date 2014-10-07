# Spree + Ionic Android/iOS Demo

This is a toy project for playing with Spree/ionic integration

Spree: http://spreecommerce.com
Ionic: http://ionicframework.com

## Installation

Install cordova and ionic

```
npm install -g cordova ionic
```

For Android, install stand alone dev tools, and android-19 packages:

https://developer.android.com/sdk/installing/index.html

For iOS, install XCode:

https://developer.apple.com/xcode/downloads/

## Development

Runs app in local browser with live-reload:

```
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
