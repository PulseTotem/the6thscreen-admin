'use strict';

/**
 * @ngdoc function
 * @name T6SConfiguration.controller:ListOAuthCtrl
 * @description
 * # ListOAuthCtrl
 * Controller of the T6SConfiguration
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ListOAuthCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', 'oauthdManager', 'saveAttribute', function ($rootScope, $scope, backendSocket, callbackManager, oauthdManager, saveAttribute) {

    $scope.providersDone = false;
    $scope.userOAuthKeysDone = false;

    backendSocket.on('AllProviderDescription', function(response) {
      callbackManager(response, function (allProviders) {
          $scope.providers = allProviders;
          $scope.providersDone = true;

          if($scope.providersDone && $scope.userOAuthKeysDone) {
            $scope.checkAllOauthFromProviders();
          }

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllProviderDescription');

    $scope.userOAuthKeys = [];

    backendSocket.refreshUser(function() {
      $rootScope.user.oauthkeys.forEach(function(oauthKey) {
        backendSocket.on('OAuthKeyDescription_' + oauthKey.id, function(response) {
          callbackManager(response, function (OAuthKey) {
              $scope.userOAuthKeys.push(OAuthKey);

              if($scope.userOAuthKeys.length == $rootScope.user.oauthkeys.length) {
                $scope.userOAuthKeysDone = true;

                if($scope.providersDone && $scope.userOAuthKeysDone) {
                  $scope.checkAllOauthFromProviders();
                }
              }
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.emit('RetrieveOAuthKeyDescription', {"oauthKeyId" : oauthKey.id});
      });
    });

    $scope.oauthDoneList = {};

    $scope.oauthDone = function(providerId, force) {
      if(typeof(force) == "undefined") {
        force = false;
      }
      if(typeof($scope.oauthDoneList[providerId]) == "undefined" || force) {
        var done = [];
        $scope.userOAuthKeys.forEach(function (oauthKey) {
          if (oauthKey.provider.id == providerId) {
            done.push(oauthKey);
          }
        });

        $scope.oauthDoneList[providerId] = done;

        return done;
      } else {
        return $scope.oauthDoneList[providerId];
      }
    };

    $scope.checkAllOauthFromProviders = function() {
      $scope.providers.forEach(function(provider) {
        $scope.oauthDone(provider.id, true);
      });
    };

    backendSocket.on('AnswerUpdateOAuthKey', function(response) {
      callbackManager(response, function (newOAuthKey) {
          $scope.userOAuthKeys.forEach(function(oauthkey) {
            if(oauthkey.id == newOAuthKey.id) {
              oauthkey.name = newOAuthKey.name;
              oauthkey.description = newOAuthKey.description;
              oauthkey.value = newOAuthKey.value;
              oauthkey.complete = newOAuthKey.complete;
            }
          });
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.signIn = function(oauth, provider) {
      oauthdManager.connectToProvider(provider.name, function(oauthKeyValue) {
        saveAttribute("UpdateOAuthKey", oauth.id, "setValue", JSON.stringify(oauthKeyValue));
      }, function(error) {
        console.log(error);
      })
    };

    $scope.signOut = function(oauth) {
      saveAttribute("UpdateOAuthKey", oauth.id, "setValue", "");
    };

    $scope.delete = function(oauth) {
      backendSocket.on('AnswerDeleteOAuthKey', function (response) {
        callbackManager(response, function (oauthId) {
          $scope.userOAuthKeys = $scope.userOAuthKeys.filter(function (element) { return (element.id != oauthId); });
          $scope.oauthDone(oauth.provider.id, true);
        })
      });

      backendSocket.emit('DeleteOAuthKey', {"oauthKeyId": oauth.id});
    };

  }]);
