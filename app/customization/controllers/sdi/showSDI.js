'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SdiCtrl
 * @description
 * # SdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowSDICtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.sdiID = $routeParams.sdiId;

    backendSocket.userIsLogin(function() {
        backendSocket.on('SDIDescription', function(response) {
            callbackManager(response, function (sdiInfo) {
                    $scope.sdi = sdiInfo;
                },
                function (fail) {
                    console.error(fail);
                }
            );
        });

        backendSocket.on('deletedProfil', function(response) {
          callbackManager(response, function (idProfil) {
            $scope.sdi.profils = $scope.sdi.profils.filter(function (element) {
              return (element.id != idProfil);
            });
          })
        });

        backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiID});
    });

    $scope.deleteProfil = function (idProfil) {
      backendSocket.emit('DeleteProfil', { "profilId": idProfil});
    };

  }]);
