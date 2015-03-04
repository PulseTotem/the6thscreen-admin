'use strict';

/**
 * @ngdoc overview
 * @name the6thscreenAdminApp
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
    'ngTouch',
    'btford.socket-io'
  ])
  .factory('backendSocket', function (socketFactory) {
        var backendIOSocket = io('http://localhost:4000/admins',
            {'reconnection' : true, 'reconnectionAttempts' : 10, 'reconnectionDelay' : 1000, 'reconnectionDelayMax' : 5000, 'timeout' : 5000, 'autoConnect' : true, 'multiplex': false});

        var backendSocket = socketFactory({
            ioSocket: backendIOSocket
        });

        return backendSocket;
  })
  .config(function ($routeProvider) {
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
  });
