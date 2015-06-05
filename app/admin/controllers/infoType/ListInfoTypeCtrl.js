'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListInfoTypeCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$modal', function ($rootScope, $scope, backendSocket, callbackManager, $modal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/infoType/AddEdit.html";

    $scope.infoTypes = [];

    backendSocket.on('AllInfoTypeDescription', function(response) {
      callbackManager(response, function (allInfoTypes) {
          $scope.infoTypes = allInfoTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteInfoType', function(response) {
      callbackManager(response, function (idInfoType) {
          $scope.infoTypes = $scope.infoTypes.filter(function (object) {
            return (object.id != idInfoType);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllInfoTypeDescription');

    $scope.deleteInfoType = function (idInfoType) {
      backendSocket.emit('DeleteInfoType', { "infoTypeId": idInfoType});
    };

    $scope.createInfoType = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddInfoTypeCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllInfoTypeDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editInfoType = function (infoType) {

      $scope.infoType = infoType;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllInfoTypeDescription');
      }, function () {
        $scope.infoType = null;
      });
    };
  }]);
