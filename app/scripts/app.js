'use strict';

/**
 * @ngdoc overview
 * @name Christian Brel <christian@the6thscreen.fr, ch.brel@gmail.com>
 * @description
 * # the6thscreenAdminApp
 *
 * Main module of the application.
 */
angular
  .module('the6thscreenAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//        $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
