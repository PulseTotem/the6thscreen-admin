'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ShowProfilCtrl
 * @description
 * # ShowProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowProfilCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', '$window', function ($scope, $routeParams, backendSocket, callbackManager, $window) {

    $scope.profilId = $routeParams.profilId;
    $scope.sdiId = $routeParams.sdiId;
    $scope.sdi = {};
    $scope.zones = [];
    $scope.selectedTimelines = [];
    $scope.connectedClients = [];

    backendSocket.on('CompleteProfilDescription', function(response) {
      callbackManager(response, function (profil) {
          $scope.profil = profil;

          $scope.profil.zoneContents.forEach(function(zc) {
            if(zc.absoluteTimeline != null) {
              $scope.selectedTimelines[zc.zone.id] = zc.absoluteTimeline;
            } else {
              if(zc.relativeTimeline != null) {
                $scope.selectedTimelines[zc.zone.id] = zc.relativeTimeline;
              }
            }

          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('ZoneContentsFromZoneId', function (response) {
      callbackManager(response, function (infoCT) {
        $scope.zones.push(infoCT);

        if($scope.zones.length == $scope.sdi.zones.length) {
          backendSocket.emit('RetrieveCompleteProfilDescription', {'profilId' : $scope.profilId});
        }

      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.on('SDIDescription', function(response) {
      callbackManager(response, function (sdiInfo) {
          $scope.sdi = sdiInfo;

          $scope.sdi.zones.forEach(function(zone) {
            backendSocket.emit('RetrieveZoneContentsFromZoneId', {'zoneId': zone.id});
          });
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on("ConnectedClientOfProfil", function (response) {
      callbackManager(response, function (connectedClients) {
        $scope.connectedClients = connectedClients;
      });
    });

    backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiId});
    backendSocket.emit("RetrieveConnectedClientOfProfil", {"profilId": $routeParams.profilId});

    $scope.refreshClient = function (clientId) {
      backendSocket.on("AnswerRefreshCommand", function (response) {
        callbackManager(response, function () {
          $window.alert("The client has been successfully refreshed.");
        });
      });

      backendSocket.emit('RefreshCommand', {'clientId': clientId});
    };

    $scope.identifyClient = function (clientId) {
      backendSocket.on("AnswerIdentifyCommand", function (response) {
        callbackManager(response, function () {
          $window.alert("You should now see a block containing the following number on your displayed screen : "+clientId+". This block will remain displayed during 30 sec.");
        });
      });

      backendSocket.emit('IdentifyCommand', {'clientId': clientId});
    };
  }]);
