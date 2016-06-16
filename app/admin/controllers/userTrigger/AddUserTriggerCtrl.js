'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddUserTriggerCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.userTrigger = {};

    backendSocket.on('AnswerCreateUserTrigger', function(response) {
      callbackManager(response, function (userTrigger) {
          $scope.userTrigger = userTrigger;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateUserTrigger", {});
}]);
