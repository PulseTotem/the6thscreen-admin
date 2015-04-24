'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsdiCtrl
 * @description
 * # AddsdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.EditSDICtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.sdi = {};

      backendSocket.on('SDIDescription', function(response) {
        callbackManager(response, function (sdi) {
            $scope.sdi = sdi;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $routeParams.sdiId});
    });

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.sdi.id, "method": element, "value": value };
      backendSocket.emit("UpdateSDIDescription", data);
    };
  }]);
