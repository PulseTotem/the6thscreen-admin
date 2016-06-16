'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditServiceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    backendSocket.on('AnswerUpdateService', function(response) {
      callbackManager(response, function (service) {
          $scope.service.complete = service.complete;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveServiceAttribute = function (element, value) {
      saveAttribute("UpdateService", $scope.service.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
