'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddBehaviourCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.behaviour = {};

    backendSocket.on('AnswerCreateBehaviour', function(response) {
      callbackManager(response, function (behaviour) {
          $scope.behaviour = behaviour;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateBehaviour", {});
}]);
