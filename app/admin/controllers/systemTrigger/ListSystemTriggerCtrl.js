'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListSystemTriggerCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$modal', function ($rootScope, $scope, backendSocket, callbackManager, $modal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/systemTrigger/AddEdit.html";

    $scope.systemTriggers = [];

    backendSocket.on('AllSystemTriggerDescription', function(response) {
      callbackManager(response, function (allSystemTriggers) {
          $scope.systemTriggers = allSystemTriggers;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteSystemTrigger', function(response) {
      callbackManager(response, function (idSystemTrigger) {
          $scope.systemTriggers = $scope.systemTriggers.filter(function (object) {
            return (object.id != idSystemTrigger);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllSystemTriggerDescription');

    $scope.deleteSystemTrigger = function (idSystemTrigger) {
      backendSocket.emit('DeleteSystemTrigger', { "systemTriggerId": idSystemTrigger});
    };

    $scope.createSystemTrigger = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddSystemTriggerCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllSystemTriggerDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editSystemTrigger = function (systemTrigger) {

      $scope.systemTrigger = systemTrigger;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllSystemTriggerDescription');
      }, function () {
        $scope.systemTrigger = null;
      });
    };
  }]);
