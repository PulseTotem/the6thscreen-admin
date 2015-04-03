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
      backendSocket.refreshUser(function(){
        $scope.listSDI = userInfo.sdis;
      });
    });
  }]);
