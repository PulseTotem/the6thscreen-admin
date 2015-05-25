'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditCallCtrl
 * @description
 * # AddEditCallCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddEditCallCtrl', ['$scope', 'backendSocket', 'callbackManager', 'saveAttribute', function ($scope, backendSocket, callbackManager, saveAttribute) {
    $scope.callType = {};
    $scope.eventName = "";

    $scope.$watch(function () {
      return $scope.call;
    }, function() {
      if(typeof($scope.event.name) != "undefined") {
        $scope.eventName = $scope.event.name;
      }
      console.log($scope.call.callType);
    }, true);

    $scope.$watch(function () {
      return $scope.eventName;
    }, function() {
      console.log("EventName changed");
      if(typeof($scope.event.id) != "undefined" && $scope.event.id != -1) {
        backendSocket.on('AnswerUpdateRelativeEvent', function (response) {
          callbackManager(response, function (relEvent) {
              $scope.refreshRelativeTimeline();
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateRelativeEvent", $scope.event.id, "setName", $scope.eventName);
      }

      if(typeof($scope.call.id) != "undefined" && $scope.call.id != -1) {
        backendSocket.on('AnswerUpdateCall', function (response) {
          callbackManager(response, function (call) {
              //OK! : Nothing to do
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateCall", $scope.call.id, "setName", $scope.eventName);
      }
    }, true);
  }]);
