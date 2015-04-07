'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowProfilCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.profilId = $routeParams.profilId;
    $scope.sdiId = $routeParams.sdiId;

    backendSocket.userIsLogin(function() {
      backendSocket.on('ProfilDescription', function(response) {
        callbackManager(response, function (profil) {
            $scope.profil = profil;
          },
          function (fail) {
            console.error(fail);
          }
        );

      });

      backendSocket.emit('RetrieveProfilDescription', {'profilId' : $scope.profilId});
    });

    $scope.removeCall = function (idCall) {
      var data = {"id": $scope.profil.id, "method": "removeCall", "value": idCall};
      backendSocket.emit("UpdateProfilDescription", data);
    };

  }]);
