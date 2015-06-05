'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListBehaviourCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$modal', function ($rootScope, $scope, backendSocket, callbackManager, $modal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/behaviour/AddEdit.html";

    $scope.behaviours = [];

    backendSocket.on('AllBehaviourDescription', function(response) {
      callbackManager(response, function (allBehaviours) {
          $scope.behaviours = allBehaviours;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteBehaviour', function(response) {
      callbackManager(response, function (idBehaviour) {
          $scope.behaviours = $scope.behaviours.filter(function (object) {
            return (object.id != idBehaviour);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllBehaviourDescription');

    $scope.deleteBehaviour = function (idBehaviour) {
      backendSocket.emit('DeleteBehaviour', { "behaviourId": idBehaviour});
    };

    $scope.createBehaviour = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddBehaviourCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllBehaviourDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editBehaviour = function (behaviour) {

      $scope.behaviour = behaviour;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllBehaviourDescription');
      }, function () {
        $scope.behaviour = null;
      });
    };
  }]);
