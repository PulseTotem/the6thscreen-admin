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
    $scope.sdi = {};
    $scope.profil = null;
    $scope.zones = [];
    $scope.selectedTimelines = [];
    $scope.neutralZoneContent = {
      "id" : -1,
      "relativeTimeline": {
        "name" : ""
      }
    };

    backendSocket.on('CompleteProfilDescription', function(response) {
      callbackManager(response, function (profil) {
          $scope.profil = profil;
          $scope.profilName = profil.name;
          $scope.profilHash = profil.hash;

          $scope.profil.zoneContents.forEach(function(zc) {
            /*if(zc.absoluteTimeline != null) {
              $scope.selectedTimelines[zc.zone.id] = zc.absoluteTimeline;
            } else {
              if(zc.relativeTimeline != null) {
                $scope.selectedTimelines[zc.zone.id] = zc.relativeTimeline;
              }
            }*/

            $scope.selectedTimelines[zc.zone.id] = zc;
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('ZoneContentsFromZoneId', function (response) {
      callbackManager(response, function (infoCT) {
        infoCT.zoneContents.splice(0, 0, $scope.neutralZoneContent);

        $scope.zones.push(infoCT);

        if($scope.zones.length == $scope.sdi.zones.length) {
          $scope.zones.forEach(function(zone) {
            $scope.selectedTimelines[zone.id] = $scope.neutralZoneContent;
          });
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

    $scope.$watch(function () {
      return $scope.profilId;
    }, function() {
      if($scope.profilId != -1) {
        backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiId});
      }
    }, true);

    $scope.$watch(function () {
      return $scope.profilName;
    }, function() {
      if($scope.profilId != -1 && $scope.profil != null && $scope.profil.name != $scope.profilName) {
        backendSocket.on('AnswerUpdateProfil', function (response) {
          callbackManager(response, function (profil) {
              $scope.profil.complete = profil.complete;
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateProfil", $scope.profilId, "setName", $scope.profilName);
      }
    }, true);

    $scope.$watch(function () {
      return $scope.profilHash;
    }, function() {
      if($scope.profilId != -1 && $scope.profil != null && $scope.profil.hash != $scope.profilHash) {
        backendSocket.on('AnswerUpdateProfil', function (response) {
          callbackManager(response, function (profil) {
              $scope.profil.complete = profil.complete;
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateProfil", $scope.profilId, "setHash", $scope.profilHash);
      }
    }, true);

    $scope.addZoneContent = function(zoneId, zoneContent) {
      var zoneContentJSON = JSON.parse(zoneContent);

      if($scope.selectedTimelines[zoneId].id != -1) {

        backendSocket.on('AnswerUpdateProfil', function (response) {
          callbackManager(response, function (profil) {
              $scope.profil.complete = profil.complete;
              $scope.selectedTimelines[zoneId] = $scope.neutralZoneContent;
              $scope.addZoneContent(zoneId, zoneContent);
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateProfil", $scope.profilId, "removeZoneContent", $scope.selectedTimelines[zoneId].id);

      } else {

        if(zoneContentJSON.id != -1) {
          backendSocket.on('AnswerUpdateProfil', function (response) {
            callbackManager(response, function (profil) {
                $scope.profil.complete = profil.complete;
                $scope.selectedTimelines[zoneId] = zoneContentJSON;
              },
              function (fail) {
                console.error(fail);
              }
            );
          });

          saveAttribute("UpdateProfil", $scope.profilId, "addZoneContent", zoneContentJSON.id);
        }
      }
    };

  }]);
