'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:T6SINPUTS.EntierCtrl
 * @description
 * # T6SINPUTS.EntierCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.T6SINPUTS.EntierCtrl', ['$scope', function ($scope) {
    $scope.value = 0;

    if($scope.paramValue.value != "" && !isNaN($scope.paramValue.value)) {
      $scope.value = parseInt($scope.paramValue.value);
    }
  }]);
