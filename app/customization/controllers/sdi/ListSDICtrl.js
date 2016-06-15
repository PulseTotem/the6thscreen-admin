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

        backendSocket.on('AllSDIDescription', function(response) {
          callbackManager(response, function (allSDIs) {
              $scope.listSDI = allSDIs;
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.emit('RetrieveAllSDIDescription');
    }]);
