'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditInfoTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    backendSocket.on('AnswerUpdateInfoType', function(response) {
      callbackManager(response, function (infoType) {
          $scope.infoType = infoType;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveInfoTypeAttribute = function (element, value) {
      saveAttribute("UpdateInfoType", $scope.infoType.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
