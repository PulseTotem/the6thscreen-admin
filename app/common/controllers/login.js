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
        $rootScope.user.remember = false;
        $rootScope.loginError = null;

        $scope.login = function(user) {
          if (typeof(user.password) != "undefined" && user.password != "") {
            var shaObj = new jsSHA(user.password, "TEXT");
            var encryptedPwd = shaObj.getHash("SHA-256", "HEX");

            var successPostCallBack = function (response) {
              var data = response.data;

              var successBackendInit = function() {

                if(user.remember) {
                  $cookies.remove("tmpAdminT6SToken");
                  $cookies.put("adminT6SToken",data.token);
                } else {
                  $cookies.remove("adminT6SToken");
                  $cookies.put("tmpAdminT6SToken",data.token);
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
                console.log("failbackend init");
                console.log(errorDesc);
                $rootScope.loginError = errorDesc;
                $cookies.remove("adminT6SToken");
                $cookies.remove("tmpAdminT6SToken");
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
              console.log("success post");

              console.log(data);

              backendSocket.init(data.token, successBackendInit, failBackendInit);

            };

            var failPostCallback = function (response) {

              var data = response.data;

              // called asynchronously if an error occurs
              // or server returns response with an error status.
              //TODO: Manage error during post => display error message
              $rootScope.loginError = data.error;
            };

            $http.post(ADMIN_CONSTANTS.backendUrl + ADMIN_CONSTANTS.loginBackendPath, {
              'usernameOrEmail': user.usernameOrEmail,
              'password': encryptedPwd,
              'rememberme': $scope.user.remember
            }).then(successPostCallBack, failPostCallback);
          } else {
            //TODO: Manage error during post => display error message
            console.log("fail login because empty password");
          }
        };
  }]);
