'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ListConstraintParamTypeCtrl
 * @description
 * # ListConstraintParamTypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListConstraintParamTypeCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$modal', function ($rootScope, $scope, backendSocket, callbackManager, $modal) {

    var CONSTANT_MODAL_ADD_EDIT_CONSTRAINTPARAMTYPE = "admin/views/constraintParamType/AddEdit.html";

    $scope.constraintParamTypes = [];

    backendSocket.on('AllConstraintParamTypeDescription', function(response) {
      callbackManager(response, function (allconstraintParamTypes) {
          $scope.constraintParamTypes = allconstraintParamTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteConstraintParamType', function(response) {
      callbackManager(response, function (idConstraintParamType) {
          $scope.constraintParamTypes = $scope.constraintParamTypes.filter(function (object) {
            return (object.id != idConstraintParamType);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllConstraintParamTypeDescription');

    $scope.deleteConstraintParamType = function (idConstraintParamType) {
      backendSocket.emit('DeleteConstraintParamType', { "constraintParamTypeId": idConstraintParamType});
    };

    $scope.createConstraintParamType = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_CONSTRAINTPARAMTYPE,
        controller: 'T6SAdmin.AddConstraintParamTypeCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllConstraintParamTypeDescription');
      }, function () {
        $scope.constraintParamType = null;
      });
    };

    $scope.editConstraintParamType = function (constraintParamType) {

      $scope.constraintParamType = constraintParamType;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_CONSTRAINTPARAMTYPE,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllConstraintParamTypeDescription');
      }, function () {
        $scope.constraintParamType = null;
      });
    };
  }]);
