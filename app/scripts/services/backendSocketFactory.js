'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.factory:backendSocket
 * @description
 * # backendSocket Factory
 * Factory of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
    .factory('backendSocket', ['ADMIN_CONSTANTS', 'socketFactory', function (ADMIN_CONSTANTS, socketFactory) {

        //TODO :  Refactor to return an object and add a method to init SocketIO Connection with token...

        /*
        var backendSocketFactory = {}
        backendSocketFactory.

        var backendIOSocket = io(ADMIN_CONSTANTS.adminBackendUrl,
            {
                'reconnection' : true,
                'reconnectionAttempts' : 10,
                'reconnectionDelay' : 1000,
                'reconnectionDelayMax' : 5000,
                'timeout' : 5000,
                'autoConnect' : true,
                'multiplex': false,
                'query': 'token=' + $scope.authToken
            });

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

        var backendSocket = socketFactory({
            ioSocket: backendIOSocket
        });

        return backendSocket;*/
    }]);
