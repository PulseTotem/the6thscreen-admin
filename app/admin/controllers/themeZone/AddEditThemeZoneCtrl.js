'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditThemeZoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateThemeZone', function(response) {
      callbackManager(response, function (themeZone) {
          $scope.theme = themeZone;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveThemeZoneAttribute = function (element, value) {
      saveAttribute("UpdateThemeZone", $scope.theme.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
