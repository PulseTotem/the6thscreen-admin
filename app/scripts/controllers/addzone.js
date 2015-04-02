'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddzoneCtrl
 * @description
 * # AddzoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('AddzoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
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

      backendSocket.emit("RetrieveAllBehaviours");

      if ($routeParams.zoneId) {
        backendSocket.emit('RetrieveZoneDescriptionOnlyId', {'zoneId' : $routeParams.zoneId});
      }
    });

    var linkSdi = function () {
      $scope.saveAttribute("linkSDI", $scope.sdiId);
    };

    $scope.saveAttribute = function (element, value) {
      if (!$scope.zone.id) {
        backendSocket.emit('CreateZoneDescription', $scope.zone);
      } else {
        var data = { "id" : $scope.sdi.id, "method": element, "value": value };
        backendSocket.emit("UpdateZoneDescription", data);
      }
    };
  });
