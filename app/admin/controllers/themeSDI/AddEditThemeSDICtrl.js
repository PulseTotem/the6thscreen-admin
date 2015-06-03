'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditThemeSDICtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.allThemeZones = [];
    backendSocket.on('AnswerUpdateThemeSDI', function(response) {
      callbackManager(response, function (themeSDI) {
          $scope.theme.complete = themeSDI.complete;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AllThemeZoneDescription', function(response) {
      callbackManager(response, function (allThemeZones) {
          $scope.allThemeZones = allThemeZones;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllThemeZoneDescription');

    $scope.showSelectedZone = function () {
      if (!$scope.theme.themeZone) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.allThemeZones, {id: $scope.theme.themeZone.id});
      return ($scope.theme.themeZone && selected.length) ? selected[0].name : 'Not set';
    };


    $scope.saveThemeSDIAttribute = function (element, value) {
      saveAttribute("UpdateThemeSDI", $scope.theme.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
