'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SdiCtrl
 * @description
 * # SdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowSDICtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.sdiID = $routeParams.sdiId;
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
                backendSocket.emit('RetrieveCallTypesFromZoneIdComplete', {'zoneId': zone.id});
              });
          },
          function (fail) {
              console.error(fail);
          }
      );
    });

    backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiID});







    backendSocket.on('deletedProfil', function(response) {
      callbackManager(response, function (idProfil) {
        $scope.sdi.profils = $scope.sdi.profils.filter(function (element) {
          return (element.id != idProfil);
        });
      })
    });



    $scope.deleteProfil = function (idProfil) {
      backendSocket.emit('DeleteProfil', { "profilId": idProfil});
    };

  }]);
