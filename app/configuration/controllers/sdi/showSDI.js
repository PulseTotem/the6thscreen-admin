'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SdiCtrl
 * @description
 * # SdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ShowSDICtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.sdiID = $routeParams.sdiId;

        backendSocket.userIsLogin(function() {
            backendSocket.on('SDIDescription', function(response) {
                callbackManager(response, function (sdiInfo) {
                        $scope.sdi = sdiInfo;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );
            });

            backendSocket.emit('RetrieveSDIDescription', {'sdiId' : $scope.sdiID});
        });
  }]);
