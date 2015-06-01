'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DeleteProfilCtrl
 * @description
 * # DeleteProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.DeleteProfilCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

    backendSocket.on('AnswerDeleteProfil', function(response) {
      callbackManager(response, function (profilId) {
        $scope.sdi.profils = $scope.sdi.profils.filter(function (element) {
          return (element.id != profilId);
        });
      })
    });

    $scope.deleteProfil = function (profilId) {
      backendSocket.emit('DeleteProfil', { "profilId": profilId});
    };

  }]);
