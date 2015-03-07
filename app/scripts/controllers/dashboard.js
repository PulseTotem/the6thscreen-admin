'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
    .controller('DashboardCtrl', ['$rootScope', '$scope', 'backendSocket', function ($rootScope, $scope, backendSocket) {

        backendSocket.on('UserDescription', function(userInfo) {
            $scope.listSDI = userInfo.sdis;
        });

        backendSocket.emit('RetrieveUserDescription', {'userId' : $rootScope.user.id});
    }]);
