'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddConstraintParamTypeCtrl
 * @description
 * # AddConstraintParamTypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddConstraintParamTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.constraintParamType = {};

    backendSocket.on('AnswerCreateConstraintParamType', function(response) {
      callbackManager(response, function (constraintParamType) {
          $scope.constraintParamType = constraintParamType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateConstraintParamType", {});
}]);
