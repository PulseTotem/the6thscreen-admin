'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddRendererCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.renderer = {};

    backendSocket.on('AnswerCreateRenderer', function(response) {
      callbackManager(response, function (renderer) {
          $scope.renderer = renderer;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateRenderer", {});
}]);
