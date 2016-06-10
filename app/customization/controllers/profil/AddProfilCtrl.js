'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddProfilCtrl
 * @description
 * # AddProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddProfilCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {
    $scope.sdiId = $routeParams.sdiId;
    $scope.profilId = -1;

    backendSocket.on('AnswerCreateProfil', function (response) {
      callbackManager(response, function (profil) {

          backendSocket.on('AnswerUpdateProfil', function (response) {
            callbackManager(response, function (profil) {

                backendSocket.on('AnswerUpdateProfil', function (response) {
                  callbackManager(response, function (profil) {
                      $scope.profilId = profil.id;
                    },
                    function (fail) {
                      console.error(fail);
                    }
                  );
                });

                saveAttribute("UpdateProfil", profil.id, "linkSDI", $scope.sdiId);
              },
              function (fail) {
                console.error(fail);
              }
            );
          });

          saveAttribute("UpdateProfil", profil.id, "setHash", profil.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('CreateProfil', {'name' : 'New'});
  }]);
