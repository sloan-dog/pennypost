var pennyPost = angular.module('PennyPost',['ngRoute','ngAnimate']);

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
	.when('/new-postcard',{
		templateUrl:'views/new-card.html',
		controller:'NewcardCtrl'
	})

}]);