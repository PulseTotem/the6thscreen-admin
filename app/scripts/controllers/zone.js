'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('ZoneCtrl', ['$scope', '$routeParams', 'backendSocket', function ($scope, $routeParams, backendSocket) {

    $scope.zoneID = $routeParams.zoneId;

    backendSocket.on('ZoneDescription', function(zoneInfo) {
      $scope.zone = zoneInfo;
    });

    backendSocket.emit('RetrieveZoneDescription', {'zoneId' : $scope.zoneID});

  }]);
