'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.SelectEditThemeZoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.themesZone = [];

    backendSocket.emit("RetrieveAllThemeZoneDescription");

    backendSocket.on('AllThemeZoneDescription', function(response) {
      callbackManager(response, function (themes) {
          $scope.themesZone = themes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.isThemeZoneSelected = function (theme) {
      return (theme.id == $scope.current_zone.theme.id);
    };

    $scope.selectThemeZone = function (theme) {
      saveAttribute("UpdateZone", $scope.current_zone.id, "linkTheme", theme.id);
      $scope.$close();
    };

    $scope.unlink = function () {
      saveAttribute("UpdateZone", $scope.current_zone.id, "unlinkTheme", $scope.current_zone.theme.id);
    };

    $scope.close = function () {
      $scope.$dismiss();
    };
  }]);
