'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddSourceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.source = {};

    backendSocket.on('AnswerCreateSource', function(response) {
      callbackManager(response, function (source) {
          $scope.source = source;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateSource", {});
}]);
