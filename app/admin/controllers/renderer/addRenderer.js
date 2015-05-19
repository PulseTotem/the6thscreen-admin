'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddserviceCtrl
 * @description
 * # AddserviceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddRendererCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.on('AllInfoTypeDescription', function(response) {
      callbackManager(response, function (allInfoTypes) {
          $scope.infoTypes = allInfoTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllInfoTypeDescription');

    backendSocket.on('RendererDescription', function(response) {
      callbackManager(response, function (renderer) {
          $scope.renderer = renderer;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveAttribute = function (element, value) {
      if (!$scope.renderer.id) {
        backendSocket.emit('CreateRendererDescription', $scope.renderer);
      } else {
        var data = { "id" : $scope.renderer.id, "method": element, "value": value };
        backendSocket.emit("UpdateRendererDescription", data);
      }
    };
  }]);
