'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ResetPasswordUserCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$window', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $window) {
    $scope.displayPass = false;
    $scope.passwordOK = false;
    $scope.pass = "";
    $scope.pass2 = "";

    $scope.checkPassword = function () {
      $scope.passwordOK = ($scope.pass == $scope.pass2 && $scope.pass != "");
    };

    backendSocket.on('AnswerResetUserPassword', function(response) {
      callbackManager(response, function () {
          $window.alert("Password reset with success.");
          $scope.$close();
        },
        function (fail) {
          console.error(fail);
          $scope.$close();
        }
      );
    });

    $scope.resetPassword = function () {
      var shaObj = new jsSHA($scope.pass, "TEXT");
      var encryptedPwd = shaObj.getHash("SHA-256", "HEX");
      backendSocket.emit('ResetUserPassword', { "userId": $scope.user.id, "password": encryptedPwd });
    };

    $scope.close = function () {
      $scope.$close();
    }
}]);
