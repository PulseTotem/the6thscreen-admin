'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditPolicyCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdatePolicy', function(response) {
      callbackManager(response, function (policy) {
          $scope.policy = policy;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.savePolicyAttribute = function (element, value) {
      saveAttribute("UpdatePolicy", $scope.policy.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
