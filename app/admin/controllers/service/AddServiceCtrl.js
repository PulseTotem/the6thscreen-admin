'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddServiceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.service = {};

    backendSocket.on('AnswerCreateService', function(response) {
      callbackManager(response, function (service) {
          $scope.service = service;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateService", {});
}]);
