'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ShowProfilCtrl
 * @description
 * # ShowProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowProfilCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.profilId = $routeParams.profilId;
    $scope.sdiId = $routeParams.sdiId;
    $scope.sdi = {};
    $scope.zones = [];

    backendSocket.on('CompleteProfilDescription', function(response) {
      callbackManager(response, function (profil) {
          $scope.profil = profil;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveCompleteProfilDescription', {'profilId' : $scope.profilId});

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
