'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ConfirmDeleteZoneCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.confirmation = false;

    $scope.deleteZone = function (zone) {
      backendSocket.emit("DeleteZone", {"zoneId": zone.id});
      $scope.$close();
    };

    $scope.cancel = function () {
      $scope.$dismiss();
    };
}]);
