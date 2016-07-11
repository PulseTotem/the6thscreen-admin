'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DeleteProfilCtrl
 * @description
 * # DeleteProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.CloneSDICtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

    backendSocket.on('AnswerCloneSDI', function(response) {
      callbackManager(response, function (sdi) {
        console.log("Received new SDI");
        $scope.listSDI.push(sdi);
        console.log($scope.listSDI);
      })
    });

    $scope.cloneSDI = function (sdiId, withProfil) {
      backendSocket.emit('CloneSDI', { "SDIId": sdiId, "cloneProfil": withProfil });
    };

  }]);
