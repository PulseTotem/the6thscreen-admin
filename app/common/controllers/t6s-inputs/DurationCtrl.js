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

    $scope.$watch(function () {
      return $scope.paramValue;
    }, function() {
      if($scope.paramValue.value != "" && !isNaN($scope.paramValue.value)) {
        $scope.value = parseInt($scope.paramValue.value);

        var durationDate = moment($scope.value*1000);

        $scope.hours = durationDate.utc().hours();
        $scope.minutes = durationDate.utc().minutes();
        $scope.seconds = durationDate.utc().seconds();

      }

      $scope.t6sInputValid = false;
      $scope.t6sInputInvalid = false;
      $scope.errors = [];
    }, true);

    var timeout = null;


    $scope.checkValue = function() {
      $scope.errors = [];
      $scope.t6sInputValid = true;
      $scope.t6sInputInvalid = false;
      if(timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }

      if($scope.hours == null) {
        $scope.hours = 0;
      }

      if($scope.minutes == null) {
        $scope.minutes = 0;
      }

      if($scope.seconds == null) {
        $scope.seconds = 0;
      }

      var duration = $scope.seconds + 60*$scope.minutes + 60*60*$scope.hours;

      if(duration <= 0) {
        $scope.t6sInputValid = false;
        $scope.t6sInputInvalid = true;
        $scope.errors.push("T6SINPUTS.ERRORS.DURATION");
      }

      /*if($scope.paramValue.paramType.constraint != null && typeof($scope.paramValue.paramType.constraint.name) != "undefined") {
        switch($scope.paramValue.paramType.constraint.name) {
          default :

        }
      }*/

      if($scope.t6sInputValid) {
        timeout = setTimeout(function() {
          $scope.saveParamValue($scope.paramValue.id, duration.toString());
        }, 1000);
      }
    }

  }]);
