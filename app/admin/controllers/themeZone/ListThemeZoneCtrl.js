'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListThemeZoneCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$modal', function ($rootScope, $scope, backendSocket, $modal) {

    var CONSTANT_MODAL_ADD_EDIT_TZ = "admin/views/themeZone/AddEdit.html";

    $scope.themeZones = [];

    backendSocket.on('AllThemeZoneDescription', function(response) {
      callbackManager(response, function (allThemeZones) {
          $scope.themeZones = allThemeZones;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteThemeZone', function(response) {
      callbackManager(response, function (idThemeZone) {
          $scope.themeZones = $scope.themeZones.filter(function (object) {
            return (object.id != idThemeZone);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllThemeZoneDescription');

    $scope.deleteThemeZone = function (idThemeZone) {
      backendSocket.emit('DeleteThemeZone', { "themeZoneId": idThemeZone});
    };

    $scope.createThemeZone = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TZ,
        controller: 'T6SAdmin.AddThemeZoneCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllThemeZoneDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.createThemeZone = function (theme) {

      $scope.theme = theme;
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TZ,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllThemeZoneDescription');
      }, function () {
        $scope.theme = null;
      });
    };
  }]);
