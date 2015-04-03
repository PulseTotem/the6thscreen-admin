'use strict';

/**
 * @ngdoc function
 * @name T6SConfiguration.controller:ListOAuthCtrl
 * @description
 * # ListOAuthCtrl
 * Controller of the T6SConfiguration
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ListOAuthCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

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

      backendSocket.emit('RetrieveAllServiceDescription');
    });
  }]);
