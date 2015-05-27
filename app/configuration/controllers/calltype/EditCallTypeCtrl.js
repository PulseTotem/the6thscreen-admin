'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.EditCallTypeCtrl', ['$scope','$routeParams','backendSocket', function ($scope, $routeParams, backendSocket) {
    $scope.callType = {};

    backendSocket.emit("RetrieveCallTypeDescription", {"callTypeId": $scope.current_calltype.id});
  }]);
