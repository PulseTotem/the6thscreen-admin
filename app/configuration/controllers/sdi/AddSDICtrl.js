'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsdiCtrl
 * @description
 * # AddsdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddSDICtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager, saveAttribute) {
    $scope.sdi = {};

    backendSocket.on('AnswerUpdateSDI', function(response) {
      callbackManager(response, function (sdi) {
          $scope.sdi = sdi;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateSDI', function(response) {

      callbackManager(response, function (sdi) {
          $scope.sdi = sdi;
          saveAttribute("UpdateSDI", $scope.sdi.id, "addUser", $rootScope.user.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('CreateSDI', $scope.sdi);
  }]);
