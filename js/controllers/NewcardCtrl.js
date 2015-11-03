pennyPost.controller('NewcardCtrl',function($scope,$http){
	$scope.hello = "heeeeeyyyyyy";
	$http({
    url:'/instagram/photos'
  }).then(function(data){
    console.log(data)
    $scope.images = data.data;
  })
  $scope.photoSet = false;
  $scope.flippin = function(){
    console.log('heeeeeyyyyyy');
    $scope.photoSet = !$scope.photoSet;
  }
});

