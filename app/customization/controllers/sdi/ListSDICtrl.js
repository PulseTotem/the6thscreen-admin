'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
    .controller('T6SCustomization.ListSDICtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

        $scope.listSDI = [];

        backendSocket.refreshUser(function(){
          $scope.listSDI = $rootScope.user.sdis;
        });

        $scope.reloadList = function (newList) {
          $scope.listSDI = newList;
        };
    }]);
