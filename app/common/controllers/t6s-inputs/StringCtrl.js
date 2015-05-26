'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:T6SINPUTS.StringCtrl
 * @description
 * # T6SINPUTS.StringCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.T6SINPUTS.StringCtrl', ['$scope', function ($scope) {
    $scope.value = $scope.paramValue.value;
  }]);
