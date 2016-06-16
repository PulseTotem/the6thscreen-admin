'use strict';

/**
 * @ngdoc directive
 * @name the6thscreenAdminApp.directive:t6sInput
 * @description
 * # t6sInput
 */
angular.module('T6SCommon')
  .directive('t6sInput', [ function() {
      return {
        restrict: 'E',
        transclude: false,
        replace: true,
        scope: {
          paramValue : '=',
          saveParamValueHandler: "&saveParamValue"
        },
        controller : ['$scope', function($scope) {
          $scope.type = $scope.paramValue.paramType.type.name;
          $scope.saveParamValue = $scope.saveParamValueHandler();
        }],
        templateUrl: 'common/views/t6s-inputs/t6s-input.html'
      };
    }
  ]);
