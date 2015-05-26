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

    $scope.zones = [];
    $scope.current_zone = null;
    $scope.current_service = null;
    $scope.current_calltype = null;

    $scope.barres = {
      "barreH1": {
        "visible": false,
        "width": 100,
        "height": 50
      },
      "barreV1": {
        "visible": false,
        "width": 50,
        "height": 100
      },
      "barreH2": {
        "visible": false,
        "width": 100,
        "height": 50
      },
      "barreV2": {
        "visible": false,
        "width": 50,
        "height": 100
      }
    };


    backendSocket.on('CallTypesDescriptionFromZone', function (response) {
      callbackManager(response, function (infoCT) {
        var index = -1;
        for (var i = 0; i < $scope.zones.length; i++) {
          if ($scope.zones[i].id == infoCT.id) {
            index = i;
          }
        }
        if (index !== -1) {
          $scope.zones.splice(index,1);
        }
        $scope.zones.push(infoCT);
        //console.log(infoCT);
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.on('SDIDescription', function(response) {
      callbackManager(response, function (sdi) {
          $scope.sdi = sdi;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateZone', function(response) {
      callbackManager(response, function (zone) {
          $scope.zones.push(zone);
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

    $scope.editCallType = function (callTypeId, event) {
      event.stopPropagation();
      event.preventDefault();
    };

    $scope.updateZonePosition = function (zone) {
      saveAttribute("UpdateZone", zone.id, "setPositionFromLeft", zone.positionFromLeft);
      saveAttribute("UpdateZone", zone.id, "setPositionFromTop", zone.positionFromTop);
      saveAttribute("UpdateZone", zone.id, "setWidth", zone.width);
      saveAttribute("UpdateZone", zone.id, "setHeight", zone.height);
    }
  }]);
