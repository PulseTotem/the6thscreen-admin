'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddTypeParamTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.typeParamType = {};

    backendSocket.on('AnswerCreateTypeParamType', function(response) {
      callbackManager(response, function (typeParamType) {
          $scope.typeParamType = typeParamType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateTypeParamType", {});
}]);
