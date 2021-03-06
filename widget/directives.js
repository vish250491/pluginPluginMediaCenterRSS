(function (angular) {
  angular
    .module('mediaCenterRSSPluginWidget')

  /****************
   *  directives  *
   ****************/

  /**
   * A directive which is used to render ng-repeat when data received.
   */
    .directive("triggerNgRepeatRender", [function () {
      var linker = function (scope, elem, attrs) {
        var a = $(elem).width();
      };
      return {
        restrict: 'A',
        link: linker
      };
    }])

  /**
   * A directive which is used handle background image for layouts.
   */
    .directive("backgroundImage", ['$filter', function ($filter) {
      var linker = function (scope, element, attrs) {
        element.css('min-height', '580px');
        var getImageUrlFilter = $filter("resizeImage");
        var setBackgroundImage = function (backgroundImage) {
          if (backgroundImage) {
            element.css(
              'background', '#010101 url('
              + getImageUrlFilter(backgroundImage, 342, 770, 'resize')
              + ') repeat fixed top center');
          } else {
            element.css('background', 'none');
          }
        };
        attrs.$observe('backgroundImage', function (newValue) {
          setBackgroundImage(newValue);
        });
      };
      return {
        restrict: 'A',
        link: linker
      };
    }])

  /**
   * A directive which is used to initiate carousel when image items received.
   */
    .directive('buildfireCarousel', function ($timeout) {
      var linker = function (scope, elem, attrs) {
        var view
          , initCarousel = function () {
            $timeout(function () {
              var imgs = scope.images || [];
              view = new buildfire.components.carousel.view("#carousel", imgs);
            });

          };

        initCarousel();

        scope.$watch(function () {
          return scope.images;
        }, function (newValue, oldValue) {
          var imgs = angular.copy(newValue);
          if (view)
            view.loadItems(imgs);
        });
      };
      return {
        restrict: 'E',
        replace: true,
        link: linker,
        template: "<div id='carousel'></div>",
        scope: {
          images: '='
        }
      }
    });
})(window.angular, undefined);
