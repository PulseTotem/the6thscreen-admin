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

        var backendSocketFactory = {}
        backendSocketFactory.backendSocket = null;
        backendSocketFactory.token = null;
        backendSocketFactory.user = null;

        backendSocketFactory.init = function(token, successCB, failCB) {
            if(backendSocketFactory.token == null) {
                backendSocketFactory.token = token;

                var backendIOSocket = io(ADMIN_CONSTANTS.adminBackendUrl,
                    {
                        'reconnection': true,
                        'reconnectionAttempts': 10,
                        'reconnectionDelay': 1000,
                        'reconnectionDelayMax': 5000,
                        'timeout': 5000,
                        'autoConnect': true,
                        'multiplex': false,
                        'query': 'token=' + token
                    });

                backendIOSocket.on("connect", function () {
                    console.info("Connected to Backend.");
                    if(backendSocketFactory.user == null) {
                        backendIOSocket.emit("RetrieveUserDescriptionFromToken", {'token' : token});
                    }
                });

                backendIOSocket.on("UserDescription", function (userDesc) {
                    console.info("UserDescription received.");
                    backendSocketFactory.user = userDesc;
                    successCB();
                });

                backendIOSocket.on("error", function (errorData) {
                    console.error("An error occurred during connection to Backend.");
                    console.debug(errorData);
                    if(backendSocketFactory.user == null) {
                        failCB("An error occurred during connection to Backend.");
                    }
                });

                backendIOSocket.on("disconnect", function () {
                    console.info("Disconnected to Backend.");
                });

                backendIOSocket.on("reconnect", function (attemptNumber) {
                    console.info("Connected to Backend after " + attemptNumber + " attempts.");
                });

                backendIOSocket.on("reconnect_attempt", function () {
                    console.info("Trying to reconnect to Backend.");
                });

                backendIOSocket.on("reconnecting", function (attemptNumber) {
                    console.info("Trying to connect to Backend - Attempt number " + attemptNumber + ".");
                });

                backendIOSocket.on("reconnect_error", function (errorData) {
                    console.error("An error occurred during reconnection to Backend.");
                    console.debug(errorData);
                });

                backendIOSocket.on("reconnect_failed", function () {
                    console.error("Failed to connect to Backend. No new attempt will be done.");
                });

                var backendSocket = socketFactory({
                    ioSocket: backendIOSocket
                });

                backendSocketFactory.backendSocket = backendSocket;
            }
        }

        backendSocketFactory.on = function() {
            if(backendSocketFactory.backendSocket != null) {
                backendSocketFactory.backendSocket.on.apply(this,arguments);
            } else {
                console.error("An error occurred : BackendSocket isn't initialized.");
            }
        };

        backendSocketFactory.addListener = function() {
            if(backendSocketFactory.backendSocket != null) {
                backendSocketFactory.backendSocket.addListener.apply(this,arguments);
            } else {
                console.error("An error occurred : BackendSocket isn't initialized.");
            }
        };

        backendSocketFactory.removeListener = function() {
            if(backendSocketFactory.backendSocket != null) {
                backendSocketFactory.backendSocket.removeListener.apply(this,arguments);
            } else {
                console.error("An error occurred : BackendSocket isn't initialized.");
            }
        };

        backendSocketFactory.removeAllListeners = function() {
            if(backendSocketFactory.backendSocket != null) {
                backendSocketFactory.backendSocket.removeAllListeners.apply(this,arguments);
            } else {
                console.error("An error occurred : BackendSocket isn't initialized.");
            }
        };

        backendSocketFactory.emit = function() {
            if(backendSocketFactory.backendSocket != null) {
                backendSocketFactory.backendSocket.emit.apply(this,arguments);
            } else {
                console.error("An error occurred : BackendSocket isn't initialized.");
            }
        };

        backendSocketFactory.forward = function() {
            if(backendSocketFactory.backendSocket != null) {
                backendSocketFactory.backendSocket.forward.apply(this,arguments);
            } else {
                console.error("An error occurred : BackendSocket isn't initialized.");
            }
        };


        return backendSocketFactory;
    }]);
