'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddInfoTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.infoType = {};

    backendSocket.on('AnswerCreateInfoType', function(response) {
      callbackManager(response, function (infoType) {
          $scope.infoType = infoType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateInfoType", {});
}]);
