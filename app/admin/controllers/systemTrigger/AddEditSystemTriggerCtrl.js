'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditSystemTriggerCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateSystemTrigger', function(response) {
      callbackManager(response, function (systemTrigger) {
          $scope.systemTrigger = systemTrigger;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveSystemTriggerAttribute = function (element, value) {
      saveAttribute("UpdateSystemTrigger", $scope.systemTrigger.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
