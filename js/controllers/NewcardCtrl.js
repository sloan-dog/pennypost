pennyPost.controller('NewcardCtrl',function($scope,$http){



  $scope.hello = "heeeeeyyyyyy";
  $scope.images = [];
  var getImages = function(){
    var theseImages;
    $http({
      url:'/instagram/photos'
    }).then(function(data){
      console.log(data)
      theseImages = data.data;
      theseImages.forEach(function(image) {
        $scope.images.push(image);
      })
      // take each object in the data.data array and push it
      // $scope.images += data.data;
    })
  }

  getImages();
  $scope.photoSet = false;
  $scope.flippin = function(){
    console.log('heeeeeyyyyyy');
    $scope.photoSet = !$scope.photoSet;
  };

  $scope.selectedImages = [];
  $scope.style = '';

  $scope.displayMode = '';



  // var timmy = document.getElementsByTagName('postcard')[0];
  // timmy.addEventListener('click',function(){
  //   console.log(timmy.innerHTML);
  // })
  // console.log(timmy);


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
  //remove added images from the card
  $scope.removeImg = function(idx){
    $scope.selectedImages.splice(idx,1);
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
  }

  $scope.clearPostcard = function() {
    $scope.selectedImages = [];
  }



// ***********************************************
// SCROLLING RESIZE SECTION
// *********************************************

// initialize scroll/resize variables
    var windowHeight = window.innerHeight;
    var lastPhoto = document.getElementsByClassName('scroll-spacer')[0];
  //


// This function throttle's function calls while listening for events
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


  var body = document.body,
      html = document.documentElement;

  var scrollOffset = 100;
  var postCard = document.querySelectorAll('div.row.center')[0];
  // console.log(postCard)
  // postCard.rect = postCard.getBoundingClientRect();

  // get the current window size and retrieve the position and bounds of the scroll spacer
  var getCurrentPos = function() {
    windowHeight = window.innerHeight;
    lastPhoto = document.getElementsByClassName('scroll-spacer')[0];
    lastPhoto.rect = lastPhoto.getBoundingClientRect();
  }


// listen for page scrolling
  window.addEventListener('scroll',throttle(function (event) {

    var state = false;

    getCurrentPos();
    if (window.innerHeight + scrollOffset > lastPhoto.rect.height + lastPhoto.rect.top) {
      getImages();
      loadingSpin();
      state = true;
    } else {
      loadingSpin();
      console.log('scroll trigger');
    }
  },600))


  // var body = document.body;
  // console.log(body);
  // window.addEventListener('scroll',function(){
  //   console.log('you be scrolling',body.scrollTop);
  //   // if (doc.scrollTop())
  //   if (body.scrollTop > 200) {
  //     $scope.displayMode = "#card-constructor {position:fixed;transform:scale(0.5);}"
  //   } else {
  //     $scope.displayMode = '';
  //   }
  //   // console.log($scope.displayMode)
  // });



// end of controller
});
