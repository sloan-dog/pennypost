pennyPost.directive('scrollPosition', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      // console.log('el',element($window))
      console.log('ang.el',$window.scrollY)

      var windowEl = angular.element($window);
      var handler = function() {
        scope.scroll = $window.scrollY;
      }
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
});