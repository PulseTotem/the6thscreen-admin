'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditOAuthCtrl
 * @description
 * # EditOAuthCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddEditOAuthCtrl', ['$rootScope', '$scope','$routeParams', '$location', 'backendSocket', 'callbackManager', 'saveAttribute', 'oauthdManager', function ($rootScope, $scope, $routeParams, $location, backendSocket, callbackManager, saveAttribute, oauthdManager) {

    backendSocket.on('AnswerUpdateOAuthKey', function(response) {
      callbackManager(response, function (oauthkey) {
          $scope.oauth.name = oauthkey.name;
          $scope.oauth.description = oauthkey.description;
          $scope.oauth.value = oauthkey.value;
          $scope.oauth.complete = oauthkey.complete;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveOAuthAttribute = function (element, value) {
      saveAttribute("UpdateOAuthKey", $scope.oauth.id, element, value);
    };

    $scope.signIn = function() {
      oauthdManager.connectToProvider($scope.oauth.provider.name, function(oauthKeyValue) {
        $scope.saveOAuthAttribute("setValue", JSON.stringify(oauthKeyValue));
      }, function(error) {
        console.log(error);
      })
    };

    $scope.signOut = function() {
      $scope.saveOAuthAttribute("setValue", "");
    };

    $scope.delete = function() {
      backendSocket.on('AnswerDeleteOAuthKey', function (response) {
        callbackManager(response, function (oauthId) {
          if (!$rootScope.$$phase) {
            $rootScope.$apply(function () {
              $location.path("/config/oauth/");
            });
          } else {
            $location.path("/config/oauth/");
          }
        })
      });

      backendSocket.emit('DeleteOAuthKey', {"oauthKeyId": $scope.oauth.id});
    };
  }]);
