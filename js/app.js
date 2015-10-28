var pennyPost = angular.module('PennyPost',['ngRoute']);

pennyPost.run(function(){
	console.log('hey!')
});

pennyPost.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

	$locationProvider.hashPrefix('!');

	$routeProvider
	.when('/',{
		templateUrl:'views/home.html',
		controller:'HomeCtrl'
	})

}]);