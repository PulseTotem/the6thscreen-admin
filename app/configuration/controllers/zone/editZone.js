'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddzoneCtrl
 * @description
 * # AddzoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.EditZoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.zone = {};

      backendSocket.on('ZoneDescription', function(response) {
        callbackManager(response, function (zone) {
            $scope.zone = zone;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.on('AllBehaviourDescription', function(response) {
        callbackManager(response, function (allBehaviour) {
            $scope.behaviours = allBehaviour;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit("RetrieveAllBehaviourDescription");
      backendSocket.emit('RetrieveZoneDescriptionOnlyId', {'zoneId' : $routeParams.zoneId});
    });

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.zone.id, "method": element, "value": value };
      backendSocket.emit("UpdateZoneDescription", data);
    };
  }]);
