'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddSystemTriggerCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.systemTrigger = {};

    backendSocket.on('AnswerCreateSystemTrigger', function(response) {
      callbackManager(response, function (systemTrigger) {
          $scope.systemTrigger = systemTrigger;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateSystemTrigger", {});
}]);
