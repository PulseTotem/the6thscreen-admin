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
        $scope.current_zone = null;
        $scope.current_service = null;
        $scope.current_calltype = null;
      }, function () {
        $scope.current_zone = null;
        $scope.current_service = null;
        $scope.current_calltype = null;
      });
    };
  }]);
