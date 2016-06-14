'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:EditOAuthCtrl
 * @description
 * # EditOAuthCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.EditOAuthCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.oauth = {};

    backendSocket.on('OAuthKeyDescription_' + $routeParams.oauthkeyId, function(response) {
      callbackManager(response, function (OAuthKey) {
          $scope.oauth = OAuthKey;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveOAuthKeyDescription', {"oauthKeyId" : $routeParams.oauthkeyId});
  }]);
