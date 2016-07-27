'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ZoneSelectBehaviourCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.behaviours = [];

    backendSocket.on('AnswerUpdateZone', function (response) {
      callbackManager(response, function (zone) {
        $scope.current_zone.complete = zone.complete;
        $scope.$close();
      }, function (fail) {
        console.error(fail);
        $scope.$close();
      });
    });

    backendSocket.on('AllBehaviourDescription', function (response) {
      callbackManager(response, function (allBehaviours) {
        $scope.behaviours = allBehaviours;
      }, function (fail) {
        console.error(fail);
      });
    });
    backendSocket.emit("RetrieveAllBehaviourDescription");

    $scope.isBehaviourSelected = function (behaviourId) {
      if ($scope.current_zone && $scope.current_zone.behaviour) {
        return ($scope.current_zone.behaviour.id == behaviourId);
      } else {
        return false;
      }
    };

    $scope.selectBehaviour = function (behaviour) {
      saveAttribute("UpdateZone", $scope.current_zone.id, "linkBehaviour", behaviour.id);
      $scope.current_zone.behaviour = behaviour;
    };

    $scope.cancel = function () {
      $scope.$dismiss();
    };
  }]);
