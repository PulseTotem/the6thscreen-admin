'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditTypeParamTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateTypeParamType', function(response) {
      callbackManager(response, function (typeParamType) {
          $scope.typeParamType = typeParamType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveTypeParamTypeAttribute = function (element, value) {
      saveAttribute("UpdateTypeParamType", $scope.typeParamType.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
