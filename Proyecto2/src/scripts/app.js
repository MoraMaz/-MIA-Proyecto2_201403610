'use strict';

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'src/views/home.html',
        //controller: 'HomeController',
        //controllerAs: 'home'
    });

  $urlRouterProvider.otherwise('/home');
});
