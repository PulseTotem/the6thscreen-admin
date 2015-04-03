'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
    .controller('ListSDICtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

        backendSocket.userIsLogin(function() {
            backendSocket.on('UserDescription', function(response) {
                callbackManager(response, function (userInfo) {
                        $scope.listSDI = userInfo.sdis;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );
            });
            backendSocket.emit('RetrieveUserDescription', {'userId' : $rootScope.user.id});
        });
    }]);
