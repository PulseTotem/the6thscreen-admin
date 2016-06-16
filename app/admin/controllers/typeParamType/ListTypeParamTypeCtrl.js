'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListTypeParamTypeCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/typeParamType/AddEdit.html";

    $scope.typeParamTypes = [];

    backendSocket.on('AllTypeParamTypeDescription', function(response) {
      callbackManager(response, function (allTypeParamTypes) {
          $scope.typeParamTypes = allTypeParamTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteTypeParamType', function(response) {
      callbackManager(response, function (idTypeParamType) {
          $scope.typeParamTypes = $scope.typeParamTypes.filter(function (object) {
            return (object.id != idTypeParamType);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllTypeParamTypeDescription');

    $scope.deleteTypeParamType = function (idTypeParamType) {
      backendSocket.emit('DeleteTypeParamType', { "typeParamTypeId": idTypeParamType});
    };

    $scope.createTypeParamType = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddTypeParamTypeCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllTypeParamTypeDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editTypeParamType = function (typeParamType) {

      $scope.typeParamType = typeParamType;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllTypeParamTypeDescription');
      }, function () {
        $scope.typeParamType = null;
      });
    };
  }]);
