'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DeleteProfilCtrl
 * @description
 * # DeleteProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.CloneProfilCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

    backendSocket.on('AnswerCloneProfil', function(response) {
      callbackManager(response, function (profil) {
        $scope.sdi.profils.push(profil);
      })
    });

    $scope.cloneProfil = function (profilId) {
      backendSocket.emit('CloneProfil', { "profilId": profilId});
    };

  }]);
