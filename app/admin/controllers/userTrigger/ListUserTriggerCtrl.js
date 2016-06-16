'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListUserTriggerCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/userTrigger/AddEdit.html";

    $scope.userTriggers = [];

    backendSocket.on('AllUserTriggerDescription', function(response) {
      callbackManager(response, function (allUserTriggers) {
          $scope.userTriggers = allUserTriggers;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteUserTrigger', function(response) {
      callbackManager(response, function (idUserTrigger) {
          $scope.userTriggers = $scope.userTriggers.filter(function (object) {
            return (object.id != idUserTrigger);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllUserTriggerDescription');

    $scope.deleteUserTrigger = function (idUserTrigger) {
      backendSocket.emit('DeleteUserTrigger', { "userTriggerId": idUserTrigger});
    };

    $scope.createUserTrigger = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddUserTriggerCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllUserTriggerDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editUserTrigger = function (userTrigger) {

      $scope.userTrigger = userTrigger;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllUserTriggerDescription');
      }, function () {
        $scope.userTrigger = null;
      });
    };
  }]);
