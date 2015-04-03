'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.factory:backendSocket
 * @description
 * # backendSocket Factory
 * Factory of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .factory('backendSocket', ['$rootScope', '$cookies', '$location', 'ADMIN_CONSTANTS', 'callbackManager', 'socketFactory', function ($rootScope, $cookies, $location, ADMIN_CONSTANTS, callbackManager, socketFactory) {
    var backendSocketFactory = {}
    backendSocketFactory.backendSocket = null;
    backendSocketFactory.token = null;
    backendSocketFactory.user = null;

    backendSocketFactory.init = function(token, successCB, failCB) {
      if(backendSocketFactory.backendSocket == null) {
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

        backendIOSocket.on("UserDescriptionFromToken", function (response) {
          callbackManager(response, function (userDesc) {
              console.info("UserDescriptionFromToken received.");
              backendSocketFactory.user = userDesc;
              $rootScope.user = backendSocketFactory.user;
              $cookies.sToken = backendSocketFactory.token;
              successCB();
            },
            function (fail) {
              console.error(fail);
              failCB("An error occurred during User authentication.");
            }
          );
        });

        backendIOSocket.on("error", function (errorData) {
          console.error("An error occurred during connection to Backend.");
          console.log(errorData);
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
          console.log(errorData);
        });

        backendIOSocket.on("reconnect_failed", function () {
          console.error("Failed to connect to Backend. No new attempt will be done.");
          backendSocketFactory.backendSocket = null;
        });

        var backendSocket = socketFactory({
          ioSocket: backendIOSocket
        });

        backendSocketFactory.backendSocket = backendSocket;

        backendSocketFactory.addFirstListeners();

      }
    };

    backendSocketFactory.on = function() {
      if(backendSocketFactory.backendSocket != null) {
        backendSocketFactory.backendSocket.removeAllListeners(arguments[0]);
        backendSocketFactory.backendSocket.on.apply(this,arguments);
      } else {
        console.error("An error occurred : BackendSocket isn't initialized.");
      }
    };

    backendSocketFactory.addListener = function() {
      if(backendSocketFactory.backendSocket != null) {
        backendSocketFactory.backendSocket.removeAllListeners(arguments[0]);
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

    backendSocketFactory.onRefreshUserCB = null;

    backendSocketFactory.addFirstListeners = function() {
      backendSocketFactory.on('UserDescription', function(response) {
        callbackManager(response, function (userDesc) {

            backendSocketFactory.user = userDesc;
            $rootScope.user = backendSocketFactory.user;

            if(backendSocketFactory.onRefreshUserCB != null) {
              backendSocketFactory.onRefreshUserCB();
              backendSocketFactory.onRefreshUserCB = null;
            }
          },
          function (fail) {
            console.error(fail);
          }
        );
      });
    };

    backendSocketFactory.refreshUser = function(onRefreshCB) {
      if(backendSocketFactory.backendSocket != null && backendSocketFactory.user != null) {
        if (onRefreshCB) {
          backendSocketFactory.onRefreshUserCB = onRefreshCB;
        }
        backendSocketFactory.emit('RetrieveUserDescription', {'userId': backendSocketFactory.user.id});
      }
    };

    backendSocketFactory.userIsLogin = function(successCB, onLoginPage) {
      var fail = function(error) {
        console.error(error);

        backendSocketFactory.backendSocket = null;
        backendSocketFactory.token = null;
        backendSocketFactory.user = null;
        delete($cookies.sToken);

        if(typeof(onLoginPage) == "undefined" || !onLoginPage) {
          if (!$rootScope.$$phase) {
            $rootScope.$apply(function () {
              $location.path('/');
            });
          } else {
            $location.path('/');
          }
        }
      };

      if(backendSocketFactory.backendSocket != null) {
        if(backendSocketFactory.user != null) {
          successCB();
        } else {
          backendSocketFactory.refreshUser(successCB);
        }
      } else {
        if(typeof($cookies.sToken) != "undefined") {
          backendSocketFactory.init($cookies.sToken, function() {
            console.log("Reconnection with user in cookie.");
            successCB();
          }, function(error) {
            fail(error);
          });
        } else {
          fail("User is not identified.");
        }
      }
    };

    return backendSocketFactory;
  }]);
