'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$http', '$location', 'ADMIN_CONSTANTS', 'backendSocket', function ($rootScope, $scope, $http, $location, ADMIN_CONSTANTS, backendSocket) {

        $rootScope.user = {};

        $scope.login = function(user) {
            var shaObj = new jsSHA(user.password, "TEXT");
            var encryptedPwd = shaObj.getHash("SHA-256", "HEX");

            $http.post(ADMIN_CONSTANTS.loginBackendUrl, {'usernameOrEmail' : user.usernameOrEmail, 'password' : encryptedPwd})
                .success(function(data, status, headers, config) {
                    $scope.authToken = data.token;

                    var successBackendInit = function() {
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply(function () {
                                $location.path('/dashboard');
                            });
                        } else {
                            $location.path('/dashboard');
                        }
                    };

                    var failBackendInit = function(errorDesc) {
                        console.error(errorDesc);
                    };

                    backendSocket.init($scope.authToken, successBackendInit, failBackendInit);
                })
                .error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    //TODO: Manage error during post => display error message
                    console.log("fail login");
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });
        };

        backendSocket.userIsLogin(function() {
            if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                    $location.path('/dashboard');
                });
            } else {
                $location.path('/dashboard');
            }
        }, true);
  }]);
