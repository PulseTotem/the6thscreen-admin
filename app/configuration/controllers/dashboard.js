'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
    .controller('DashboardCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

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

            backendSocket.on('deletedSDI', function (response) {
              callbackManager(response, function (sdiId) {
                $scope.listSDI = $scope.listSDI.filter(function (element) { return (element.id != sdiId); });
              })
            });

            backendSocket.emit('RetrieveUserDescription', {'userId' : $rootScope.user.id});
        });

        $scope.deleteSDI = function (idSDI) {
          backendSocket.emit('DeleteSDI', { "sdiId": idSDI});
        };
    }]);
