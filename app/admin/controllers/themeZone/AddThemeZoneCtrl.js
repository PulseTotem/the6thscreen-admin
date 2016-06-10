'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddThemeZoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.theme = {};

    backendSocket.on('AnswerCreateThemeZone', function(response) {
      callbackManager(response, function (themeZone) {
          $scope.theme = themeZone;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateThemeZone", {});
}]);
