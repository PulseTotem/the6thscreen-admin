'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('ZoneCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.zoneID = $routeParams.zoneId;

        backendSocket.userIsLogin(function() {
            backendSocket.on('ZoneDescription', function(response) {
                callbackManager(response, function (zoneInfo) {
                        $scope.zone = zoneInfo;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );

            });

            backendSocket.emit('RetrieveZoneDescription', {'zoneId' : $scope.zoneID});
        });

  }]);
