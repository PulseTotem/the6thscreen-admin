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

        backendIOSocket.on("connect", function() {
            console.info("Connected to Backend.");
        });

        backendIOSocket.on("error", function(errorData) {
            console.error("An error occurred during connection to Backend.");
            console.debug(errorData);
        });

        backendIOSocket.on("disconnect", function() {
            console.info("Disconnected to Backend.");
        });

        backendIOSocket.on("reconnect", function(attemptNumber) {
            console.info("Connected to Backend after " + attemptNumber + " attempts.");
        });

        backendIOSocket.on("reconnect_attempt", function() {
            console.info("Trying to reconnect to Backend.");
        });

        backendIOSocket.on("reconnecting", function(attemptNumber) {
            console.info("Trying to connect to Backend - Attempt number " + attemptNumber + ".");
        });

        backendIOSocket.on("reconnect_error", function(errorData) {
            console.error("An error occurred during reconnection to Backend.");
            console.debug(errorData);
        });

        backendIOSocket.on("reconnect_failed", function() {
            console.error("Failed to connect to Backend. No new attempt will be done.");
        });

        /*{
            query: 'token=' + token
        }*/

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
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
