'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditSourceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateSource', function(response) {
      callbackManager(response, function (source) {
          $scope.source = source;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveSourceAttribute = function (element, value) {
      saveAttribute("UpdateSource", $scope.source.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
