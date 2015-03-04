'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('DashboardCtrl', ['$scope', 'backendSocket', function ($scope) {

    $scope.user = {
      "id": 1,
      "username": "toto"
    };

    $scope.listSDI = [
      {"name": "machin", "description": "toto"},
      {"name": "bidule", "description": "blabla"}
    ];



  }]);
