'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditBehaviourCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateBehaviour', function(response) {
      callbackManager(response, function (behaviour) {
          $scope.behaviour = behaviour;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveBehaviourAttribute = function (element, value) {
      saveAttribute("UpdateBehaviour", $scope.behaviour.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
