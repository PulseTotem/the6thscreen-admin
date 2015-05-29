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

    backendSocket.on('AllBehaviourDescription', function (response) {
      callbackManager(response, function (allBehaviours) {
        $scope.behaviours = allBehaviours;
      }, function (fail) {
        console.error(fail);
      });
    });
    backendSocket.emit("RetrieveAllBehaviourDescription");

    $scope.isBehaviourSelected = function (behaviourId) {
      if ($scope.current_zone.behaviour) {
        return ($scope.current_zone.behaviour.id == behaviourId);
      } else {
        return false;
      }
    };

    $scope.selectBehaviour = function (behaviourId) {
      saveAttribute("UpdateZone", $scope.current_zone.id, "linkBehaviour", behaviourId);
      $scope.$close();
    };

    $scope.cancel = function () {
      $scope.$dismiss();
    };
  }]);
