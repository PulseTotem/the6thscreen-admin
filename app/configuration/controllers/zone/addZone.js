'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddzoneCtrl
 * @description
 * # AddzoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddZoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.sdiId = $routeParams.sdiId;
      $scope.zone = {};

      backendSocket.on('ZoneDescription', function(response) {
        callbackManager(response, function (zone) {
            $scope.zone = zone;
            linkSdi();
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
    });

    var linkSdi = function () {
      var data = { "id": $scope.sdiId, "method": "addZone", "value": $scope.zone.id};
      backendSocket.emit("UpdateSDIDescription", data);
    };

    $scope.saveAttribute = function (element, value) {
      if (!$scope.zone.id) {
        backendSocket.emit('CreateZoneDescription', $scope.zone);
      } else {
        var data = { "id" : $scope.zone.id, "method": element, "value": value };
        backendSocket.emit("UpdateZoneDescription", data);
      }
    };
  }]);
