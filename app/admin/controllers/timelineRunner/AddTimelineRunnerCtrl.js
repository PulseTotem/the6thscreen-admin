'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:timelineRunner.TimelineRunner
 * @description
 * # TimelineRunner
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.TimelineRunner', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.timelineRunner = {};

    backendSocket.on('AnswerCreateTimelineRunner', function(response) {
      callbackManager(response, function (timelineRunner) {
          $scope.timelineRunner = timelineRunner;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateTimelineRunner", {});
}]);
