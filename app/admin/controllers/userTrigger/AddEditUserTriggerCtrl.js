'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditUserTriggerCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateUserTrigger', function(response) {
      callbackManager(response, function (userTrigger) {
          $scope.userTrigger = userTrigger;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveUserTriggerAttribute = function (element, value) {
      saveAttribute("UpdateUserTrigger", $scope.userTrigger.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
