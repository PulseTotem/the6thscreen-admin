'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:T6SINPUTS.EnumCtrl
 * @description
 * # T6SINPUTS.EnumCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.T6SINPUTS.RangeCtrl', ['$scope', function ($scope) {
    $scope.value = $scope.paramValue.value;
    $scope.sliderMin = 0;
    $scope.sliderMax = 0;
    $scope.sliderStep = 1;
    $scope.ticks = [0,0];

    $scope.getRange = function () {
      if($scope.paramValue.paramType.constraint != null && typeof($scope.paramValue.paramType.constraint.values) != "undefined") {
        var values = $scope.paramValue.paramType.constraint.values;
        var tabValues = values.split(',');

        if (tabValues.length < 2) {
          console.error("No range specified.");
        } else {
          $scope.sliderMin = parseInt(tabValues[0]);
          $scope.sliderMax = parseInt(tabValues[1]);
          $scope.ticks = [$scope.sliderMin, $scope.sliderMax];

          if (tabValues.length == 3) {
            $scope.sliderStep = parseInt(tabValues[2]);
          }
        }
      } else {
        console.error("No range specified.");
      }
    };

    $scope.getRange();

    $scope.$watch(function () {
      return $scope.paramValue;
    }, function() {
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

      if($scope.value === "" || $scope.value == null) {
        $scope.t6sInputValid = false;
        $scope.t6sInputInvalid = true;
        $scope.errors.push("T6SINPUTS.ERRORS.REQUIRED");
      }

      if($scope.t6sInputValid) {
        timeout = setTimeout(function() {
          $scope.saveParamValue($scope.paramValue.id, $scope.value);
        }, 1000);
      }
    };

  }]);
