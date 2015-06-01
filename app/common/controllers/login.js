'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.LoginCtrl', ['$rootScope', '$scope', '$http', '$location', 'ADMIN_CONSTANTS', 'backendSocket', '$cookies', function ($rootScope, $scope, $http, $location, ADMIN_CONSTANTS, backendSocket, $cookies) {

        $rootScope.user = {};

        $scope.login = function(user) {
          if (typeof(user.password) != "undefined" && user.password != "") {
            var shaObj = new jsSHA(user.password, "TEXT");
            var encryptedPwd = shaObj.getHash("SHA-256", "HEX");

            $http.post(ADMIN_CONSTANTS.backendUrl + ADMIN_CONSTANTS.loginBackendPath, {
              'usernameOrEmail': user.usernameOrEmail,
              'password': encryptedPwd
            })
              .success(function (data, status, headers, config) {
                var successBackendInit = function() {

                  if(user.remember) {
                    delete($cookies.tmpAdminT6SToken);
                    $cookies.adminT6SToken = data.token;
                  } else {
                    delete($cookies.adminT6SToken);
                    $cookies.tmpAdminT6SToken = data.token;
                  }

                  $rootScope.header = "default";
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path(ADMIN_CONSTANTS.loginRoute);
                    });
                  } else {
                    $location.path(ADMIN_CONSTANTS.loginRoute);
                  }
                };

                var failBackendInit = function(errorDesc) {
                  console.error(errorDesc); //TODO: Manage error during post => display error message
                  delete($cookies.adminT6SToken);
                  delete($cookies.tmpAdminT6SToken);
                  $rootScope.header = "home";
                  if(next.templateUrl != "../common/views/login.html") {
                    if (!$rootScope.$$phase) {
                      $rootScope.$apply(function () {
                        $location.path(ADMIN_CONSTANTS.homeRoute);
                      });
                    } else {
                      $location.path(ADMIN_CONSTANTS.homeRoute);
                    }
                  }
                };

                backendSocket.init(data.token, successBackendInit, failBackendInit);

              })
              .error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                //TODO: Manage error during post => display error message
                console.log("fail login during POST");
              });
          } else {
            //TODO: Manage error during post => display error message
            console.log("fail login because empty password");
          }
        };
  }]);
