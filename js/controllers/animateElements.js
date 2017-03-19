app.controller('animateElements', function($scope) {
  $scope.animateElementIn = function($el) {
   $el.removeClass('not-visible');
   $el.addClass('animated fadeInUp'); // this example leverages animate.css classes
 };

 $scope.animateElementOut = function($el) {
   $el.addClass('not-visible');
   $el.removeClass('animated fadeInUp'); // this example leverages animate.css classes
 };
});
