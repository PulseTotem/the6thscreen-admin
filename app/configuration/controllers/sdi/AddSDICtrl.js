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
    var now = new Date();
    var tmpName = "SDI "+now.toLocaleDateString()+" "+now.toLocaleTimeString();
    $scope.sdi = {
      "name": tmpName
    };

    backendSocket.on('AnswerCreateSDI', function(response) {

      callbackManager(response, function (sdi) {
          $scope.sdi = sdi;
          saveAttribute("UpdateSDI", $scope.sdi.id, "linkTeam", $rootScope.user.defaultTeam.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('CreateSDI', $scope.sdi);
  }]);
