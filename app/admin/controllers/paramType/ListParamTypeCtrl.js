'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListParamTypeCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$modal', function ($rootScope, $scope, backendSocket, callbackManager, $modal) {

    var CONSTANT_MODAL_ADD_EDIT_PARAMTYPE = "admin/views/paramType/AddEdit.html";

    $scope.paramTypes = [];

    backendSocket.on('AllParamTypeDescription', function(response) {
      callbackManager(response, function (allParamTypes) {
          $scope.paramTypes = allParamTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteParamType', function(response) {
      callbackManager(response, function (idParamType) {
          $scope.paramTypes = $scope.paramTypes.filter(function (object) {
            return (object.id != idParamType);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllParamTypeDescription');

    $scope.deleteParamType = function (idParamType) {
      backendSocket.emit('DeleteParamType', { "paramTypeId": idParamType});
    };

    $scope.createParamType = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_PARAMTYPE,
        controller: 'T6SAdmin.AddParamTypeCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllParamTypeDescription');
      }, function () {
        $scope.paramType = null;
      });
    };

    $scope.editParamType = function (paramType) {

      $scope.paramType = paramType;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_PARAMTYPE,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllParamTypeDescription');
      }, function () {
        $scope.paramType = null;
      });
    };
  }]);
