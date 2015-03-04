'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('DashboardCtrl', ['$scope', 'backendSocket', function ($scope, backendSocket) {

    $scope.user = {
      "id": 1,
      "username": "toto"
    };

    backendSocket.on('UserDescription', function(userInfo) {
      $scope.listSDI = userInfo.sdis;
    });

    backendSocket.emit('RetrieveUserDescription', {'userId' : $scope.user.id});
  }]);
