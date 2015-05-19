'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddCallTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager, $modalInstance) {
    $scope.sources = [{"name":"toto", "description": "blabla"}];
    console.log("Got the following current zone : "+$scope.zoneId+" or :"+$scope.current_zone);
    $('#modalCallTypeCreation').modal('show');
  }]);
