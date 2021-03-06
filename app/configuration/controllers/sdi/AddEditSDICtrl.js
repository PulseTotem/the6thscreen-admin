'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsdiCtrl
 * @description
 * # AddsdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddEditSDICtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$uibModal', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager, saveAttribute, $uibModal) {

    var CONSTANT_MODAL_CALLTYPE_CREATION_URL = "configuration/views/sdi/configuration/ModalCallTypeCreation.html";
    var CONSTANT_MODAL_CONFIRM_DELETE_ZONE = "configuration/views/sdi/configuration/ModalConfirmDeleteZone.html";
    var CONSTANT_MODAL_SELECT_BEHAVIOUR = "configuration/views/sdi/configuration/ModalSelectBehaviour.html";
    var CONSTANT_MODAL_ZONE_THEME = "configuration/views/sdi/configuration/ModalZoneTheme.html";

    $scope.current_zone = null;
    $scope.current_service = null;
    $scope.current_calltype = null;
    $scope.authorize_zone_creation = true;
    $scope.retrievedTeams = [];

    backendSocket.on('AllTeamDescription', function(response) {
      callbackManager(response, function (allTeams) {
          $scope.retrievedTeams = allTeams;
          $scope.updateSelectedTeam();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllTeamDescription');

    $scope.updateSelectedTeam = function () {
      if (!$scope.sdi.team) {
        $scope.selectedTeam = 'You must link this SDI to a team!';
      } else {
        var selected = $scope.retrievedTeams.filter(function (element) {return element.id == $scope.sdi.team.id;});
        $scope.selectedTeam = ($scope.sdi.team.id && selected.length) ? selected[0].name : 'You must link this SDI to a team!';
      }
    };

    $scope.linkTeam = function (teamId) {
      $scope.sdi.team.id = teamId;
      saveAttribute("UpdateSDI", $scope.sdi.id, "linkTeam", teamId);
      $scope.updateSelectedTeam();
    };

    $scope.refreshZoneInformations = function(zoneJSON, callTypes) {
      var index = -1;
      for (var i = 0; i < $scope.sdi.zones.length; i++) {
        if ($scope.sdi.zones[i].id == zoneJSON.id) {
          index = i;
        }
      }

      if (index != -1) {
        var zone = $scope.sdi.zones[index];

        if (callTypes) {
          if (zone.cannotBeDeleted) {
            zoneJSON.cannotBeDeleted = true;
          }
          $scope.sdi.zones.splice(index,1);
          $scope.sdi.zones.push(zoneJSON);
        } else {
          zone.positionFromLeft = zoneJSON.positionFromLeft;
          zone.positionFromTop = zoneJSON.positionFromTop;
          zone.width = zoneJSON.width;
          zone.height = zoneJSON.height;
          zone.name = zoneJSON.name;
          zone.complete = zoneJSON.complete;
        }
      } else {
        $scope.sdi.zones.push(zoneJSON);
      }

    };

    backendSocket.on('AnswerDeleteZone', function (response) {
      callbackManager(response, function (zoneId) {
        for (var indexZone in $scope.sdi.zones) {
          var zone = $scope.sdi.zones[indexZone];
          if (zone.id == zoneId) {
            $scope.sdi.zones.splice(indexZone, 1);
          }
        }
      })
    });

    backendSocket.on('AnswerDeleteCallType', function (response) {
      callbackManager(response, function (callTypeid) {
        for (var indexZone in $scope.sdi.zones) {
          var zone = $scope.sdi.zones[indexZone];

          for (var indexService in zone.services) {
            var service = zone.services[indexService];
            for (var indexCallType in service.callTypes) {
              var ct = service.callTypes[indexCallType];
              if (ct.id == callTypeid) {
                service.callTypes.splice(indexCallType,1);
                if (service.callTypes.length == 0) {
                  zone.services.splice(indexService, 1);
                }
                return;
              }
            }
          }
        }

      }, function (fail) {
        console.error(fail);
      })
    });

    backendSocket.on('AnswerUpdateZone', function (response) {
      callbackManager(response, function (zone) {

         $scope.refreshZoneInformations(zone);
      }, function (fail) {
        console.error(fail);
      });
    });


    backendSocket.on('CallTypesDescriptionFromZone', function (response) {
      callbackManager(response, function (infoCT) {
        $scope.refreshZoneInformations(infoCT, true);
        //console.log(infoCT);
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.on('CompleteProfilDescription', function(response) {
      callbackManager(response, function (profil) {
          for (var i = 0; i < profil.zoneContents.length; i++) {
            var zoneContent = profil.zoneContents[i];

            for (var j = 0; j < $scope.sdi.zones.length; j++) {
              var zone = $scope.sdi.zones[j];
              if (zoneContent.zone.id == zone.id) {
                zone.cannotBeDeleted = true;
              }
            }
          }
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.retrieveAllProfils = function() {
      if ($scope.sdi.profils.length > 0) {
        $scope.sdi.profils.forEach(function (profil) {
          backendSocket.emit("RetrieveCompleteProfilDescription", {"profilId": profil.id});
        });
      } else {
        $scope.allRequestsDone = true;
      }
    };

    backendSocket.on('SDIDescription', function(response) {
      callbackManager(response, function (sdi) {
          $scope.sdi = sdi;

          for (var i = 0; i < sdi.zones.length; i++) {
            backendSocket.emit('RetrieveCallTypesFromZoneId', {'zoneId': sdi.zones[i].id});
          }
          $scope.retrieveAllProfils();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateZone', function(response) {
      callbackManager(response, function (zone) {
          $scope.sdi.zones.push(zone);
          saveAttribute("UpdateSDI", $scope.sdi.id, "addZone", zone.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.createZone = function (event) {
      if ($scope.authorize_zone_creation) {
        var div = event.target;

        var divWidth = div.offsetWidth;
        var divHeight = div.offsetHeight;

        var positionXInDiv = event.offsetX;
        var positionYInDiv = event.offsetY;

        var relativeX = (positionXInDiv / divWidth) * 100;
        var relativeY = (positionYInDiv / divHeight) * 100;

        var zone = {
          width: 10,
          height: 10,
          positionFromTop: relativeY,
          positionFromLeft: relativeX
        };

        backendSocket.emit("CreateZone", zone);
        event.stopPropagation();
        event.preventDefault();
      }
    };



    $scope.onDropCompleteOnZone = function (data, zone_id) {
      console.log("Got the following data : "+data+" for zone : "+zone_id);
      $scope.current_zone = zone_id;
      $scope.current_service = data;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_CALLTYPE_CREATION_URL,
        controller: 'T6SConfiguration.AddCallTypeCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function (callType) {
        backendSocket.emit('RetrieveCallTypesFromZoneId', {'zoneId': $scope.current_zone.id});
        $scope.current_zone = null;
        $scope.current_service = null;
        $scope.current_calltype = null;
      }, function () {
        $scope.current_zone = null;
        $scope.current_service = null;
        $scope.current_calltype = null;
      });
    };

    $scope.editCallType = function (service, zone, callType, $event) {
      $event.stopPropagation();
      $event.preventDefault();

      $scope.current_zone = zone;
      $scope.current_service = service;
      $scope.current_calltype = callType;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_CALLTYPE_CREATION_URL,
        controller: 'T6SConfiguration.EditCallTypeCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function (callType) {
        backendSocket.emit('RetrieveCallTypesFromZoneId', {'zoneId': $scope.current_zone.id});
        $scope.reset_current();
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.updateZonePosition = function (zone) {
      backendSocket.emit("UpdateZonePosition",zone);
    };

    $scope.updateSDIName = function () {
      saveAttribute("UpdateSDI", $scope.sdi.id, "setName", $scope.sdi.name);
    };

    $scope.updateZoneName = function (zone) {
      saveAttribute("UpdateZone", zone.id, "setName", zone.name);
    };

    $scope.reset_current = function () {
      $scope.current_zone = null;
      $scope.current_service = null;
      $scope.current_calltype = null;
    };

    var displayModal = function (modalTemplateUrl, zone) {
      $scope.current_zone = zone;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: modalTemplateUrl,
        scope: $scope
      });

      modalInstance.result.then(function () {
        $scope.refreshZoneInformations($scope.current_zone);
        $scope.reset_current();
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.confirmDeleteZone = function (zone) {
      displayModal(CONSTANT_MODAL_CONFIRM_DELETE_ZONE, zone);
    };

    $scope.selectBehaviour = function (zone) {
      displayModal(CONSTANT_MODAL_SELECT_BEHAVIOUR, zone);
    };

    $scope.selectTheme = function (zone) {
      displayModal(CONSTANT_MODAL_ZONE_THEME, zone);
    };
  }]);
