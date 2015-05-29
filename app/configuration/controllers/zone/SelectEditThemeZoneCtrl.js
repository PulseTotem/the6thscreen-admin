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

    $scope.themes = [];

    backendSocket.emit("RetrieveAllThemeZoneDescription");

    backendSocket.on('AllThemeZoneDescription', function(response) {
      callbackManager(response, function (themes) {
          $scope.themes = themes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.selectTheme = function (theme) {
      saveAttribute("UpdateZone", $scope.current_zone.id, "linkTheme", theme.id);
      $scope.$close();
    };

    $scope.cancel = function () {
      $scope.$dismiss();
    };
  }]);
