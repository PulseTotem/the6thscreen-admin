'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddPolicyCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.policy = {};

    backendSocket.on('AnswerCreatePolicy', function(response) {
      callbackManager(response, function (policy) {
          $scope.policy = policy;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreatePolicy", {});
}]);
