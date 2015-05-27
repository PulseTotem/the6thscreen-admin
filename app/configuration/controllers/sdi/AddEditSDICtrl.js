'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsdiCtrl
 * @description
 * # AddsdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddEditSDICtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$modal', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager, saveAttribute, $modal) {

    var CONSTANT_MODAL_CALLTYPE_CREATION_URL = "configuration/views/sdi/configuration/ModalCallTypeCreation.html";

    $scope.current_zone = null;
    $scope.current_service = null;
    $scope.current_calltype = null;

    $scope.refreshZoneInformations = function(zoneJSON) {
      var index = -1;
      for (var i = 0; i < $scope.sdi.zones.length; i++) {
        if ($scope.sdi.zones[i].id == zoneJSON.id) {
          index = i;
        }
      }

      if (index != -1) {
        var zone = $scope.sdi.zones[index];
        zone.positionFromLeft = zoneJSON.positionFromLeft;
        zone.positionFromTop = zoneJSON.positionFromTop;
        zone.width = zoneJSON.width;
        zone.height = zoneJSON.height;
        zone.name = zoneJSON.name;
      } else {
        $scope.sdi.zones.push(zoneJSON);
      }

    };

    backendSocket.on('DeletedCallType', function (response) {
      callbackManager(response, function (callTypeid) {
        for (var indexZone in $scope.sdi.zones) {
          var zone = $scope.sdi.zones[index];
          for (var indexCallType in zone.callTypes) {
            var ct = zone.callTypes[indexCallType];
            if (ct.id == callTypeid) {
              zone.callTypes.splice(indexCallType,1);
              return;
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
        var index = -1;
        for (var i = 0; i < $scope.sdi.zones.length; i++) {
          if ($scope.sdi.zones[i].id == infoCT.id) {
            index = i;
          }
        }
        if (index !== -1) {
          $scope.sdi.zones.splice(index,1);
        }
        $scope.sdi.zones.push(infoCT);
        //console.log(infoCT);
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.on('SDIDescription', function(response) {
      callbackManager(response, function (sdi) {
          $scope.sdi = sdi;

          for (var i = 0; i < sdi.zones.length; i++) {
            backendSocket.emit('RetrieveCallTypesFromZoneId', {'zoneId': sdi.zones[i].id});
          }
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
    };



    $scope.onDropCompleteOnZone = function (data, zone_id) {
      console.log("Got the following data : "+data+" for zone : "+zone_id);
      $scope.current_zone = zone_id;
      $scope.current_service = data;

      var modalInstance = $modal.open({
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

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_CALLTYPE_CREATION_URL,
        controller: 'T6SConfiguration.EditCallTypeCtrl',
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

    $scope.updateZonePosition = function (zone) {
      backendSocket.emit("UpdateZonePosition",zone);
    };

    $scope.updateSDIName = function () {
      saveAttribute("UpdateSDI", $scope.sdi.id, "setName", $scope.sdi.name);
    };

    $scope.updateZoneName = function (zone) {
      saveAttribute("UpdateZone", zone.id, "setName", zone.name);
    };
  }]);
