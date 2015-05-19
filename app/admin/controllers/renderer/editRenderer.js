'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddserviceCtrl
 * @description
 * # AddserviceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.EditRendererCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
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
    backendSocket.emit('RetrieveRendererDescriptionOnlyId', {'rendererId' : $routeParams.rendererId});

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.renderer.id, "method": element, "value": value };
      backendSocket.emit("UpdateRendererDescription", data);
    };
  }]);
