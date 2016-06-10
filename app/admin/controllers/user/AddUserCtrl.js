'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddUserCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.user = {};

    backendSocket.on('AnswerCreateUser', function(response) {
      callbackManager(response, function (user) {
          $scope.user = user;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateUser", {});
}]);
