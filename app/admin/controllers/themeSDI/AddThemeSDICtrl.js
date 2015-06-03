'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddThemeSDICtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.theme = {};

    backendSocket.on('AnswerCreateThemeSDI', function(response) {
      callbackManager(response, function (themeSDI) {
          $scope.theme = themeSDI;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateThemeSDI", {});
}]);
