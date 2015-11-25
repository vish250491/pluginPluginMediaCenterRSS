'use strict';

(function (angular, buildfire) {

  // Make sure to include the required dependency to the module
  angular.module('mediaCenterRSSPluginWidget', [
    'ngRoute',
    'infinite-scroll',
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "videosharing-embed",
    'ngAnimate'
  ])

    .config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {

      /**
       * To make href urls safe on mobile
       */
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile|file):/);


      /**
       * To disable pull don to refresh functionality
       * **/
      buildfire.datastore.disableRefresh();


      /*****************************
       *  Redirects and Otherwise  *
       *****************************/

        // Use $routeProvider to configure any redirects (when) and invalid urls (otherwise).
      $routeProvider
        .when('/', {
          template: '<div></div>'
        })
        .when('/item', {
          templateUrl: 'templates/media.html',
          controllerAs: 'WidgetMedia',
          controller: 'WidgetMediaCtrl'
        })

        // If the url is invalid then redirect to '/'
        .otherwise('/');
    }])
    .run(['Location', '$location', '$rootScope', function (Location, $location, $rootScope) {
      buildfire.navigation.onBackButtonClick = function () {
        var reg = /^\/item/;
        if (reg.test($location.path())) {
          $rootScope.showFeed = true;
          Location.goTo('#/');
        }
        else {
          buildfire.navigation.navigateHome();
        }
      }
    }])
    .filter('getImageUrl', ['Buildfire', function (Buildfire) {
      return function (url, width, height, type) {
        if (type == 'resize')
          return Buildfire.imageLib.resizeImage(url, {
            width: width,
            height: height
          });
        else
          return Buildfire.imageLib.cropImage(url, {
            width: width,
            height: height
          });
      }
    }]);
})(window.angular, window.buildfire);