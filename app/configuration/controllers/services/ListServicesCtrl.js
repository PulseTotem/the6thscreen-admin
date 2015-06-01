'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ListServicesCtrl
 * @description
 * # AddsdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ListServicesCtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager) {
    backendSocket.on('AllServiceDescription', function(response) {
      callbackManager(response, function (services) {
          $scope.services = services;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("RetrieveAllServiceDescription");
  }]);
