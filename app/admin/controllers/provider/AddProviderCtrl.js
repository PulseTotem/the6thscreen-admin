'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddProviderCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.provider = {};

    backendSocket.on('AnswerCreateProvider', function(response) {
      callbackManager(response, function (provider) {
          $scope.provider = provider;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateProvider", {});
}]);
