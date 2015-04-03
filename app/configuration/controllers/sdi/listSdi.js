'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
    .controller('T6SConfiguration.ListSDICtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

        backendSocket.userIsLogin(function() {
          backendSocket.refreshUser(function(){
            $scope.listSDI = userInfo.sdis;
          });
        });
    }]);
