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

      if($scope.paramValue.paramType.constraint != null && typeof($scope.paramValue.paramType.constraint.name) != "undefined") {
        switch($scope.paramValue.paramType.constraint.name) {
          case "URL" :
            if(! isUrl()) {
              $scope.t6sInputValid = false;
              $scope.t6sInputInvalid = true;
              $scope.errors.push("T6SINPUTS.ERRORS.URL");
            }
            break;
        }
      }

      if($scope.t6sInputValid) {
        timeout = setTimeout(function() {
          $scope.saveParamValue($scope.paramValue.id, $scope.value);
        }, 1000);
      }
    }

    //Constraint check functions
    var isUrl = function() {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          //'|^(localhost)?' + // OR localhost address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

      return pattern.test($scope.value);
    };

  }]);
