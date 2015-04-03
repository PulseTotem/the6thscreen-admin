'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('AddcalltypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.callType = {};
    $scope.callType.zone = $routeParams.zoneId;

    backendSocket.userIsLogin(function() {
      backendSocket.on('AllSourceDescription', function(response) {
        callbackManager(response, function (allSources) {
            $scope.sources = allSources;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveAllSourceDescription');

      backendSocket.on('AllZoneDescription', function(response) {
        callbackManager(response, function (allZones) {
            $scope.zones = allZones;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveAllZoneDescription');

      backendSocket.on('AllRendererDescription', function(response) {
        callbackManager(response, function (allRenderers) {
            $scope.renderers = allRenderers;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveAllRendererDescription');

      backendSocket.on('CallTypeDescription', function(response) {
        callbackManager(response, function (callType) {
            $scope.callType = callType;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      if ($routeParams.callTypeId) {
        backendSocket.emit('RetrieveCallTypeDescriptionOnlyId', {'callTypeId' : $routeParams.callTypeId});
      }
    });

    $scope.saveAttribute = function (element, value) {
      if (!$scope.callType.id) {
        backendSocket.emit('CreateCallTypeDescription', $scope.callType);
      } else {
        var data = { "id" : $scope.callType.id, "method": element, "value": value };
        backendSocket.emit("UpdateCallTypeDescription", data);
      }
    };
  }]);
