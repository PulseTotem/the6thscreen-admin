'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('AddsourceCtrl', ['$scope','backendSocket', function ($scope, backendSocket) {

    backendSocket.on('AllInfoTypeDescription', function(allInfoTypes) {
      $scope.infoTypes = allInfoTypes;
    });

    backendSocket.emit('RetrieveAllInfoTypeDescription');

    backendSocket.on('AllParamTypeDescription', function(allParamTypes) {
      $scope.paramTypes = allParamTypes;
    });

    backendSocket.emit('RetrieveAllParamTypeDescription');
  }]);
