'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddOAuthCtrl
 * @description
 * # AddOAuthCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddOAuthCtrl', ['$rootScope', '$scope','$routeParams','backendSocket', 'callbackManager', function ($rootScope, $scope, $routeParams, backendSocket, callbackManager) {

    var oauthKey = {
      "userId": $rootScope.user.id,
      "providerId": $routeParams.providerId,
      "name": "OAuthKey : " + $rootScope.user.username,
      "description": "",
      "value": ""
    };

    $scope.oauth = {};

    backendSocket.on('OAuthKeyDescription', function(response) {
      callbackManager(response, function (OAuthKey) {
          $scope.oauth = OAuthKey;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('CreateOAuthKeyDescription', oauthKey);
  }]);
