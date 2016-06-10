'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:T6SINPUTS.DatetimeCtrl
 * @description
 * # T6SINPUTS.DatetimeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.T6SINPUTS.DatetimeCtrl', ['$scope', function ($scope) {
    $scope.isOpen = false;
    $scope.dt = new Date();

    $scope.openCalendar = function(e) {
      e.preventDefault();
      e.stopPropagation();

      $scope.isOpen = true;
    };

    $scope.$watch(function () {
      return $scope.paramValue.value;
    }, function() {
      if($scope.paramValue.value != "" && !isNaN($scope.paramValue.value)) {
        var milliseconds = parseInt($scope.paramValue.value);

        $scope.dt = new Date(milliseconds);
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

      var milliseconds = $scope.dt.getTime();
      console.log("In milliseconds: "+milliseconds);
      console.log("hours : "+$scope.dt.getHours());
      if($scope.paramValue.paramType.constraint != null && typeof($scope.paramValue.paramType.constraint.name) != "undefined") {
        switch($scope.paramValue.paramType.constraint.name) {
          case "InFuture" :
            if(! isInFuture(milliseconds)) {
              $scope.t6sInputValid = false;
              $scope.t6sInputInvalid = true;
              $scope.errors.push("T6SINPUTS.ERRORS.INFUTURE");
            }
            break;

        }
      }

      if($scope.t6sInputValid) {
        timeout = setTimeout(function() {
          $scope.saveParamValue($scope.paramValue.id, milliseconds.toString());
        }, 1000);
      }
    };

    var isInFuture = function(milliseconds) {
      var now = (new Date()).getTime();
      var difference = milliseconds-now;

      // A date is in the future if it is a minute in the future (i.e. 60 seconds or 60 000 milliseconds)
      return (difference > 60000);
    };

  }]);
