'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.SelectEditThemeSDICtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.themesSDI = [];

    backendSocket.emit("RetrieveAllThemeSDIDescription");

    backendSocket.on('AllThemeSDIDescription', function(response) {
      callbackManager(response, function (themes) {
          $scope.themesSDI = themes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.isThemeSDISelected = function (theme) {
      if ($scope.sdi.theme) {
        return (theme.id == $scope.sdi.theme.id);
      } else {
        return false;
      }
    };

    $scope.selectThemeSDI = function (theme) {
      saveAttribute("UpdateSDI", $scope.sdi.id, "linkTheme", theme.id);
      $scope.sdi.theme = theme;
    };
  }]);
