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

  $scope.displayMode = '';

  var body = document.body;
  console.log(body);
  window.addEventListener('scroll',function(){
    console.log('you be scrolling',body.scrollTop);
    // if (doc.scrollTop())
    if (body.scrollTop > 200) {
      $scope.displayMode = "#card-constructor {position:fixed;transform:scale(0.5);}"
    } else {
      $scope.displayMode = '';
    }
    // console.log($scope.displayMode)
  });

  var timmy = document.getElementsByTagName('postcard')[0];
  timmy.addEventListener('click',function(){
    console.log(timmy.innerHTML);
  })
  console.log(timmy);


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

