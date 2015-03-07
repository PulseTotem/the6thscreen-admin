'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SdiCtrl
 * @description
 * # SdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('SdiCtrl', ['$scope', '$routeParams', 'backendSocket', function ($scope, $routeParams, backendSocket) {

    $scope.sdiID = $routeParams.sdiId;

    backendSocket.on('SDIDescription', function(sdiInfo) {
      $scope.sdi = sdiInfo;
    });

    backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiID});
  }]);
