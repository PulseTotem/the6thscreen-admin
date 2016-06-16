'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListThemeSDICtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TSDI = "admin/views/themeSDI/AddEdit.html";

    $scope.themeSDIs = [];

    backendSocket.on('AllThemeSDIDescription', function(response) {
      callbackManager(response, function (allThemeSDIs) {
          $scope.themeSDIs = allThemeSDIs;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteThemeSDI', function(response) {
      callbackManager(response, function (idThemeSDI) {
          $scope.themeSDIs = $scope.themeSDIs.filter(function (object) {
            return (object.id != idThemeSDI);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllThemeSDIDescription');

    $scope.deleteThemeSDI = function (idThemeSDI) {
      backendSocket.emit('DeleteThemeSDI', { "themeSDIId": idThemeSDI});
    };

    $scope.createThemeSDI = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TSDI,
        controller: 'T6SAdmin.AddThemeSDICtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllThemeSDIDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editThemeSDI = function (theme) {

      $scope.theme = theme;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TSDI,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllThemeSDIDescription');
      }, function () {
        $scope.theme = null;
      });
    };
  }]);
