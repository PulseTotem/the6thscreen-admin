'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:T6SINPUTS.BooleanCtrl
 * @description
 * # T6SINPUTS.EntierCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
  .controller('T6SCommon.T6SINPUTS.BooleanCtrl', ['$scope', function ($scope) {
    $scope.value = false;

    $scope.$watch(function () {
      return $scope.paramValue;
    }, function() {
      if ($scope.paramValue.value != null) {
        $scope.value = ($scope.paramValue.value == "true");
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

      if($scope.value === undefined || $scope.value == null) {
        $scope.value = false;
      }

      /*if($scope.paramValue.paramType.constraint != null && typeof($scope.paramValue.paramType.constraint.name) != "undefined") {

      }*/

      if($scope.t6sInputValid) {
        timeout = setTimeout(function() {
          $scope.saveParamValue($scope.paramValue.id, $scope.value.toString());
        }, 1000);
      }
    }

    //Constraint check functions

  }]);
