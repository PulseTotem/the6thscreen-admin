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

    $scope.t6sInputValid = false;
    $scope.t6sInputInvalid = false;
    $scope.errors = [];
    var timeout = null;

    $scope.checkValue = function() {
      $scope.errors = [];
      $scope.t6sInputValid = true;
      $scope.t6sInputInvalid = false;
      if(timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }

      if($scope.value === "" || $scope.value == null) {
        $scope.t6sInputValid = false;
        $scope.t6sInputInvalid = true;
        $scope.errors.push("T6SINPUTS.ERRORS.REQUIRED");
      }

      if(isNaN($scope.value)) {
        $scope.t6sInputValid = false;
        $scope.t6sInputInvalid = true;
        $scope.errors.push("T6SINPUTS.ERRORS.NAN");
      }

      if($scope.paramValue.paramType.constraint != null && typeof($scope.paramValue.paramType.constraint.name) != "undefined") {
        switch($scope.paramValue.paramType.constraint.name) {
          case "Positive" :
            if(! isPositive()) {
              $scope.t6sInputValid = false;
              $scope.t6sInputInvalid = true;
              $scope.errors.push("T6SINPUTS.ERRORS.POSITIVE");
            }
            break;
        }
      }

      if($scope.t6sInputValid) {
        timeout = setTimeout(function() {
          $scope.saveParamValue($scope.paramValue.id, $scope.value.toString());
        }, 1000);
      }
    }

    //Constraint check functions
    var isPositive = function() {
      if(!isNaN($scope.value)) {
        var valueInt = parseInt($scope.value);
        return valueInt > 0;
      } else {
        return false;
      }
    };

  }]);
