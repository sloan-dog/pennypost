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
  };
  $scope.selectedImages = [];
  $scope.style = '';
  $scope.addImage = function(image){
    if($scope.selectedImages.length < 4){
      $scope.selectedImages.push(image);
      if($scope.selectedImages.length === 1){
      	$scope.style = "#card-constructor img{width:100%;}"
      }else if($scope.selectedImages.length === 2){
      	$scope.style = "#card-constructor img{width:50%;height:100%;}"
      }else if($scope.selectedImages.length === 3){
      	$scope.style = "#card-constructor img:first-child{width:66%;float:left;}"+
      	"#card-constructor img:nth-child(2){width:32%;float:right;}"+
      	"#card-constructor img:nth-child(3){width:32%;float:right;margin-top:2%}";
      }else if($scope.selectedImages.length === 4){
		$scope.style = "#card-constructor img:first-child{width:50%;margin-top:-20%;}"+
      	"#card-constructor img:nth-child(2){width:50%;margin-top:-20%;}"+
      	"#card-constructor img:nth-child(3){width:50%;}"+
      	"#card-constructor img:nth-child(4){width:50%;}";
      };
    }else{
      alert('fuck you');
    };

  };
});

