pennyPost.controller('NewcardCtrl',function($scope,$http,$httpParamSerializerJQLike,$window){



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


  $scope.addImage = function(image,event){
    if($scope.selectedImages.length < 4 && $scope.selectedImages.indexOf(image) === -1){
      $scope.selectedImages.push(image);
      if($scope.selectedImages.length === 1){
        $scope.style = "#img0{width:100%;}"
      }else if($scope.selectedImages.length === 2){
        $scope.style = "#img0,#img1{width:48%;top:12%;border: 5px solid #fff;}"
      }else if($scope.selectedImages.length === 3){
        $scope.style = "#img0{position:relative;float:left;width:65%;top:0%;left:0%;border:3px solid #fff;}"+
        "#img1{position:relative;width:32%;top:0%;left:0%;border:3px solid #fff;}"+
        "#img2{position:relative;width:32%;margin-top:1%;top:0%;left:0%;border-top:2%;border:3px solid #fff;}";
      }else if($scope.selectedImages.length === 4){
        $scope.style = "#img0{width:50%;margin-top:-18%;border: 5px solid #fff;}"+
            "#img1{width:50%;margin-top:-18%;border: 5px solid #fff;}"+
            "#img2{width:50%;border: 5px solid #fff;}"+
            "#img3{width:50%;border: 5px solid #fff;}";
        console.log(document.getElementsByTagName("#card-constructor img"));
      };
    }else{
      alert('I do apologize, but it appears you have tried to do something impossible.');
    // show card when scrolling and new photo is selected
    };
    // event.offsetY
    console.log('current pos',$window.scrollY)
    if ($window.scrollY > 300) {
      console.log('current position more than 600!')
      $scope.photoSelected = true;
    }

  };
  //remove added images from the card
  $scope.removeImg = function(idx){
    $scope.selectedImages.splice(idx,1);
    if($scope.selectedImages.length === 1){
        $scope.style = "#img0{width:100%;}"
      }else if($scope.selectedImages.length === 2){
        $scope.style = "#img0,#img1{width:48%;margin-top:9%;border: 5px solid #fff;}"
      }else if($scope.selectedImages.length === 3){
        $scope.style = "#img0{width:65%;float:left;border: 3px solid #fff;}"+
        "#img1{width:33%;float:right;border: 3px solid #fff;}"+
        "#img2{width:33%;float:right;border-top:2%;border: 3px solid #fff;}";
      }else if($scope.selectedImages.length === 4){
        $scope.style = "#img0{width:50%;margin-top:-18%;border: 5px solid #fff;}"+
            "#img1{width:50%;margin-top:-18%;border: 5px solid #fff;}"+
            "#img2{width:50%;border: 5px solid #fff;}"+
            "#img3{width:50%;border: 5px solid #fff;}";
        console.log(document.getElementsByTagName("#card-constructor img"));
      };
  }

  $scope.clearPostcard = function() {
    $scope.selectedImages = [];
  }

  $scope.sendPostcard = function(){
    var postcardHtml = document.querySelector('#card-constructor').innerHTML;
    var postcardStyle = $scope.style
    var front = "<html><head><style>"+postcardStyle+"</style></head><body>"+postcardHtml+"</body></html>"
    console.log(front);
    $http({
      method:'POST',
      url:'/lob/sendcard',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:$httpParamSerializerJQLike({front:front})
    }).then(function(res){
      console.log(res)
    });
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
