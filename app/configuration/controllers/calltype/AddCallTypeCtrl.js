'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddCallTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {
    $scope.callType = null;

    backendSocket.on('AnswerCreateCallType', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;
          saveAttribute("UpdateCallType", $scope.callType.id, "linkZone", $scope.current_zone.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateCallType", {});
  }]);
