'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:T6SINPUTS.DurationCtrl
 * @description
 * # T6SINPUTS.DurationCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.T6SINPUTS.DurationCtrl', ['$scope', function ($scope) {
    $scope.hours = 0;
    $scope.minutes = 0;
    $scope.seconds = 0;

    if($scope.paramValue.value != "" && !isNaN($scope.paramValue.value)) {
      $scope.value = parseInt($scope.paramValue.value);

      var durationDate = moment($scope.value*1000);

      $scope.hours = durationDate.utc().hours();
      $scope.minutes = durationDate.utc().minutes();
      $scope.seconds = durationDate.utc().seconds();

    }
  }]);
