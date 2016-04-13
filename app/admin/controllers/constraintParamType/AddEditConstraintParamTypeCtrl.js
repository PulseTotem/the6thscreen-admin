'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditConstraintParamTypeCtrl
 * @description
 * # AddEditConstraintParamTypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditConstraintParamTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.typeParamTypes = [];
    $scope.constraints = [];

    backendSocket.on('AnswerUpdateConstraintParamType', function(response) {
      callbackManager(response, function (constraintParamType) {
          $scope.constraintParamType.complete = constraintParamType.complete;
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

    $scope.showSelectedType = function () {
      if (!$scope.constraintParamType.type) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.typeParamTypes, {id: $scope.constraintParamType.type.id});
      return ($scope.constraintParamType.type && selected.length) ? selected[0].name : 'Not set';
    };

    $scope.saveConstraintParamTypeAttribute = function (element, value) {
      saveAttribute("UpdateConstraintParamType", $scope.constraintParamType.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
