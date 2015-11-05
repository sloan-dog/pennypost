pennyPost.directive('postcard',function(){
	return {
		restrict:'E',
		templateUrl:'views/partials/postcard.html',
		scope:{
			images:'=',
		}
	}
})