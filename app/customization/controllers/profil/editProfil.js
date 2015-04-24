'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddzoneCtrl
 * @description
 * # AddzoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.EditProfilCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.sdiId = $routeParams.sdiId;
      $scope.profil = {};

      backendSocket.on('ProfilDescription', function(response) {
        callbackManager(response, function (profil) {
            $scope.profil = profil;
            addProfil();
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit("RetrieveProfilDescription", { "profilId": $routeParams.profilId});
    });

    var addProfil = function () {
      var data = { "id": $scope.sdiId, "method": "addProfil", "value": $scope.profil.id};
      backendSocket.emit("UpdateSDIDescription", data);
    };

    $scope.saveAttribute = function (element, value) {
      if (!$scope.profil.id) {
        backendSocket.emit('CreateProfilDescription', $scope.profil);
      } else {
        var data = { "id" : $scope.profil.id, "method": element, "value": value };
        backendSocket.emit("UpdateProfilDescription", data);
      }
    };
  }]);
