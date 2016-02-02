'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:timelineRunner.AddEditTimelineRunnerCtrl
 * @description
 * # AddEditTimelineRunnerCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditTimelineRunnerCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateTimelineRunner', function(response) {
      callbackManager(response, function (timelineRunner) {
          $scope.timelineRunner = timelineRunner;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveTimelineRunnerAttribute = function (element, value) {
      saveAttribute("UpdateTimelineRunner", $scope.timelineRunner.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
  }]);
