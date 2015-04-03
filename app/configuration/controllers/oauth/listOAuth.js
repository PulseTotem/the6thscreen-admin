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

      $scope.userOAuthKeys = [];

      $rootScope.user.oauthkeys.forEach(function(oauthKey) {
        backendSocket.on('OAuthKeyDescription_' + oauthKey.id, function(response) {
          callbackManager(response, function (OAuthKey) {
              $scope.userOAuthKeys.push(OAuthKey);
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.emit('RetrieveOAuthKeyDescription', {"oauthKeyId" : oauthKey.id});
      });
    });

    $scope.oauthOnly = function(element) {
      return element.oauth;
    };

    $scope.oauthDone = function(serviceId) {
      var done = false;
      $scope.userOAuthKeys.forEach(function(oauthKey) {
        if(oauthKey.service.id == serviceId) {
          done = true;
        }
      });

      return done;
    };



  }]);
