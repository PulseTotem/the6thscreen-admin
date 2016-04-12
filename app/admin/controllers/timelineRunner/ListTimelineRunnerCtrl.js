'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:timelineRunner.ListTimelineRunnerCtrl
 * @description
 * # ListTimelineRunnerCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListTimelineRunnerCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/timelineRunner/AddEdit.html";

    $scope.timelineRunners = [];

    backendSocket.on('AllTimelineRunnerDescription', function(response) {
      callbackManager(response, function (allTimelineRunners) {
          $scope.timelineRunners = allTimelineRunners;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteTimelineRunner', function(response) {
      callbackManager(response, function (idTimelineRunner) {
          $scope.timelineRunners = $scope.timelineRunners.filter(function (object) {
            return (object.id != idTimelineRunner);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllTimelineRunnerDescription');

    $scope.deleteTimelineRunner = function (idTimelineRunner) {
      backendSocket.emit('DeleteTimelineRunner', { "timelineRunnerId": idTimelineRunner});
    };

    $scope.createTimelineRunner = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddTimelineRunnerCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllTimelineRunnerDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editTimelineRunner = function (timelineRunner) {

      $scope.timelineRunner = timelineRunner;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllTimelineRunnerDescription');
      }, function () {
        $scope.timelineRunner = null;
      });
    };
  }]);
