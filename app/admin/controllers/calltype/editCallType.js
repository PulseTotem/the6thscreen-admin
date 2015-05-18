'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.EditCallTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.callType = {};
    $scope.zoneFixed = false;

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

    backendSocket.emit('RetrieveAllRendererDescription');

    backendSocket.on('AllRenderPolicyDescription', function(response) {
      callbackManager(response, function (allRenderPolicies) {
          $scope.renderPolicies = allRenderPolicies;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllRenderPolicyDescription');

    backendSocket.on('AllReceivePolicyDescription', function(response) {
      callbackManager(response, function (allReceivePolicies) {
          $scope.receivePolicies = allReceivePolicies;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllReceivePolicyDescription');

    backendSocket.on('CallTypeDescription', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveCallTypeDescriptionOnlyId', {'callTypeId' : $routeParams.callTypeId});

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.callType.id, "method": element, "value": value };
      backendSocket.emit("UpdateCallTypeDescription", data);
    };
  }]);
