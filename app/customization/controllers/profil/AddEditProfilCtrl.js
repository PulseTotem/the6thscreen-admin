'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditProfilCtrl
 * @description
 * # AddEditProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddEditProfilCtrl', ['$scope', 'backendSocket', 'callbackManager', 'saveAttribute', function ($scope, backendSocket, callbackManager, saveAttribute) {
    $scope.sdiId = $routeParams.sdiId;
    $scope.sdi = {};
    $scope.zones = [];

    backendSocket.on('CallTypesDescriptionFromZone', function (response) {
      callbackManager(response, function (infoCT) {
        $scope.zones.push(infoCT);
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.on('SDIDescription', function(response) {
      callbackManager(response, function (sdiInfo) {
          $scope.sdi = sdiInfo;

          $scope.sdi.zones.forEach(function(zone) {
            backendSocket.emit('RetrieveCallTypesFromZoneId', {'zoneId': zone.id});
          });
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiId});
  }]);
