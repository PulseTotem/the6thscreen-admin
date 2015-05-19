'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddCallTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $modalInstance) {
    $scope.sources = [];
    $scope.callType = null;

    backendSocket.on('SourcesDescriptionFromService', function(response) {
      callbackManager(response, function (sources) {
          $scope.sources = sources;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerUpdateCallType', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateCallType', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;
          saveAttribute("UpdateCallType", $scope.callType.id, "linkZone", $scope.current_zone);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("RetrieveSourcesFromServiceId", {"serviceId": $scope.current_service});
    backendSocket.emit("CreateCallType", {});

    console.log("Got the following current zone : "+$scope.zoneId+" or :"+$scope.current_zone);
  }]);
