'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', 'ADMIN_CONSTANTS', 'backendSocket', function ($scope, $http, $location, ADMIN_CONSTANTS, backendSocket) {

        $scope.user = {};

        $scope.login = function(user) {
            console.log(user);

            var shaObj = new jsSHA(user.password, "TEXT");
            var encryptedPwd = shaObj.getHash("SHA-512", "HEX");

            console.log(encryptedPwd);

            $http.post(ADMIN_CONSTANTS.loginBackendUrl, {'usernameOrEmail' : user.usernameOrEmail, 'password' : encryptedPwd})
                .success(function(data, status, headers, config) {
                    console.log("success login");
                    console.log(data);

                    $scope.authToken = data.token;

                    backendSocket.init($scope.authToken);

                    $location.path('/dashboard');
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
  }]);
