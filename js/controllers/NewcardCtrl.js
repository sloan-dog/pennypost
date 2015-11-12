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
    if($scope.selectedImages.length < 4 && $scope.selectedImages.indexOf(image) === -1){
      $scope.selectedImages.push(image);
      if($scope.selectedImages.length === 1){
      	$scope.style = "#card-constructor img{width:100%;}"
      }else if($scope.selectedImages.length === 2){
      	$scope.style = "#card-constructor img{width:48%;margin-top:9%;border: 5px solid #fff;}"
      }else if($scope.selectedImages.length === 3){
      	$scope.style = "#card-constructor img:first-child{width:66%;float:left;border: 5px solid #fff;}"+
      	"#card-constructor img:nth-child(2){width:34%;float:right;border: 5px solid #fff;}"+
      	"#card-constructor img:nth-child(3){width:34%;float:right;border-top:2%;border: 5px solid #fff;}";
      }else if($scope.selectedImages.length === 4){
    		$scope.style = "#card-constructor img:first-child{width:50%;margin-top:-18%;border: 5px solid #fff;}"+
          	"#card-constructor img:nth-child(2){width:50%;margin-top:-18%;border: 5px solid #fff;}"+
          	"#card-constructor img:nth-child(3){width:50%;border: 5px solid #fff;}"+
          	"#card-constructor img:nth-child(4){width:50%;border: 5px solid #fff;}";
        console.log(document.getElementsByTagName("#card-constructor img"));
      };
    }else{
      alert('I do apologize, but it appears you have tried to do something impossible.');
    };

  };

  $scope.clearPostcard = function() {
    $scope.selectedImages = [];
  }

// end of controller
});


