'use strict';

/**
 * @ngdoc function
 * @name T6SConfiguration.controller:ListOAuthCtrl
 * @description
 * # ListOAuthCtrl
 * Controller of the T6SConfiguration
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ListOAuthCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', 'oauthdManager', function ($rootScope, $scope, backendSocket, callbackManager, oauthdManager) {

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

    $scope.signIn = function(service) {
      oauthdManager.connectToProvider(service.provider, function(oauthKeyValue) {
        var oauthKey = {
          "userId": $rootScope.user.id,
          "serviceId": service.id,
          "name": "OAuthKey_" + $rootScope.user.id + "_" + service.id + "_" + service.provider,
          "description": "",
          "value": JSON.stringify(oauthKeyValue)
        };

        backendSocket.on('OAuthKeyDescription', function(response) {
          callbackManager(response, function (OAuthKey) {
              $scope.userOAuthKeys.push(OAuthKey);
              $('#service_signin_' + OAuthKey.service.id).hide();
              $('#service_signout_' + OAuthKey.service.id).show();
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.emit('CreateOAuthKeyDescription', oauthKey);


      }, function(error) {
        console.log(error);
      })
    };

    $scope.signOut = function(service) {

      var oauthId = -1;
      $scope.userOAuthKeys.forEach(function(oauthKey) {
        if(oauthKey.service.id == service.id) {
          oauthId = oauthKey.id;
        }
      });

      if(oauthId == -1) {
        return false;
      }

      backendSocket.on('deletedOAuthKey', function (response) {
        callbackManager(response, function (oauthId) {
          $scope.userOAuthKeys = $scope.userOAuthKeys.filter(function (element) { return (element.id != oauthId); });
          $('#service_signin_' + service.id).show();
          $('#service_signout_' + service.id).hide();
        })
      });

      backendSocket.emit('DeleteOAuthKey', {"oauthKeyId": oauthId});
    };



  }]);
