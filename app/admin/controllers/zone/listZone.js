'use strict';

angular.module('T6SAdmin')
  .controller('T6SAdmin.ListZoneCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope,  backendSocket, callbackManager) {

    backendSocket.on('AllZoneDescription', function(response) {
      callbackManager(response, function (allZones) {
          $scope.zones = allZones;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('deletedZone', function(response) {
      callbackManager(response, function (idZone) {
          $scope.zones = $scope.zones.filter(function (object) {
            return (object.id != idZone);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllZoneDescription');

    $scope.deleteZone = function (idZone) {
      backendSocket.emit('DeleteZone', { "zoneId": idZone});
    };

  }]);
