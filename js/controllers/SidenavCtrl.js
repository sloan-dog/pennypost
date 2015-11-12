pennyPost.controller('SidenavCtrl', function($scope){
	$scope.navOpen = false;
	$scope.navToggle = function(){
		$scope.navOpen = !$scope.navOpen;
	}
});