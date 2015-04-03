'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ServiceCtrl
 * @description
 * # ServiceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('ListServiceCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope,  backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      backendSocket.on('AllServiceDescription', function(response) {
        callbackManager(response, function (allServices) {
            $scope.services = allServices;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.on('deletedService', function(response) {
        callbackManager(response, function (idService) {
            $scope.services = $scope.services.filter(function (object) {
              return (object.id != idService);
            });

          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveAllServiceDescription');
    });

    $scope.deleteService = function (idService) {
      backendSocket.emit('DeleteService', { "serviceId": idService});
    };
  }]);
