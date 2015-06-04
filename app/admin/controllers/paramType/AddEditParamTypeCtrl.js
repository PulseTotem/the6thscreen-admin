'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditParamTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.typeParamTypes = [];
    $scope.constraints = [];

    backendSocket.on('AnswerUpdateParamType', function(response) {
      callbackManager(response, function (paramType) {
          $scope.paramType.complete = paramType.complete;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AllTypeParamTypeDescription', function(response) {
      callbackManager(response, function (allTypes) {
          $scope.typeParamTypes = allTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllTypeParamTypeDescription');

    backendSocket.on('AllConstraintDescription', function(response) {
      callbackManager(response, function (constraints) {
          $scope.constraints = constraints;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllConstraint');

    $scope.showSelectedType = function () {
      if (!$scope.paramType.type) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.typeParamTypes, {id: $scope.paramType.type.id});
      return ($scope.paramType.type && selected.length) ? selected[0].name : 'Not set';
    };

    $scope.showSelectedConstraint = function () {
      if (!$scope.paramType.constraint) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.constraints, {id: $scope.paramType.constraint.id});
      return ($scope.paramType.constraint && selected.length) ? selected[0].name : 'Not set';
    };


    $scope.saveParamTypeAttribute = function (element, value) {
      saveAttribute("UpdateParamType", $scope.paramType.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
