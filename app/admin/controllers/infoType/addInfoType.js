'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddserviceCtrl
 * @description
 * # AddserviceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddInfoTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.infoType = {};

    backendSocket.on('InfoTypeDescription', function(response) {
      callbackManager(response, function (infoType) {
          $scope.infoType = infoType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveAttribute = function (element, value) {
      if (!$scope.infoType.id) {
        backendSocket.emit('CreateInfoTypeDescription', $scope.infoType);
      } else {
        var data = { "id" : $scope.infoType.id, "method": element, "value": value };
        backendSocket.emit("UpdateInfoTypeDescription", data);
      }
    };
  }]);
