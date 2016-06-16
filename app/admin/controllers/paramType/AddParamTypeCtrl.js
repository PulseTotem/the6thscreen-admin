'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddParamTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.paramType = {};

    backendSocket.on('AnswerCreateParamType', function(response) {
      callbackManager(response, function (paramType) {
          $scope.paramType = paramType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateParamType", {});
}]);
