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
    var zones = [];

    /*var zoneIndex = null;
    var manageZone = function() {
      if(zoneIndex == null) {
        zoneIndex = 0;
      } else {
        zoneIndex++;
      }

      if(zoneIndex < zones.length) {
        var zoneInfo = zones[zoneIndex];

        var callTypes = [];

        zoneInfo['services'] = [];

        var manageCallTypes = function() {

          var retrieveCallType = function(sourceId) {
            for(var iCT in callTypes) {
              var ct = callTypes[iCT];
              if(ct.source.id == sourceId) {
                return ct;
              }
            }
          }


          var sources = [];
          var services = [];
          backendSocket.on('SourceDescription', function(response) {
            callbackManager(response, function (sourceInfo) {
                sources.push(sourceInfo);

                if(typeof(services[sourceInfo.service.id]) == "undefined") {
                  services[sourceInfo.service.id] = sourceInfo.service;
                  services[sourceInfo.service.id]["callTypes"] = [];
                }

                var ct = retrieveCallType(sourceInfo.id);

                services[sourceInfo.service.id]["callTypes"].push(ct);

                if(sources.length == callTypes.length) {
                  services.forEach(function(service) {
                    zoneInfo['services'].push(service);
                  });
                  $scope.zones.push(zoneInfo);
                  manageZone();
                }
              },
              function (fail) {
                console.error(fail);
              }
            );

          });


          callTypes.forEach(function(callTypeInfo) {
            backendSocket.emit('RetrieveSourceDescription', {'sourceId': callTypeInfo.source.id});
          });
        };

        backendSocket.on('CallTypeDescription', function(response) {
          callbackManager(response, function (callTypeInfo) {
              callTypes.push(callTypeInfo);

              if(callTypes.length == zoneInfo.callTypes.length) {
                manageCallTypes();
              }
            },
            function (fail) {
              console.error(fail);
            }
          );

        });

        if(zoneInfo.callTypes.length > 0) {
          zoneInfo.callTypes.forEach(function (callType) {
            backendSocket.emit('RetrieveCallTypeDescription', {'callTypeId': callType.id});
          });
        } else {
          manageZone();
        }
      }
    }; */

    backendSocket.on('ZoneDescription', function(response) {
      callbackManager(response, function (zoneInfo) {
          zones.push(zoneInfo);

          if(zones.length == $scope.sdi.zones.length) {
            manageZone();
          }

        },
        function (fail) {
          console.error(fail);
        }
      );

    });

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
                //backendSocket.emit('RetrieveZoneDescription', {'zoneId' : zone.id});
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
