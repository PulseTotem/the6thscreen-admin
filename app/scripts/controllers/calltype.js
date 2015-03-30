'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:CalltypeCtrl
 * @description
 * # CalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('CalltypeCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope,  backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      backendSocket.on('AllCallTypeDescription', function(response) {
        callbackManager(response, function (allCallTypes) {
            $scope.callTypes = allCallTypes;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.on('deletedCallType', function(response) {
        callbackManager(response, function (idSource) {
            $scope.callTypes = $scope.callTypes.filter(function (object) {
              return (object.id != idSource);
            });

          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.emit('RetrieveAllCallTypeDescription');
    });

    $scope.deleteCallType = function (idCallType) {
      backendSocket.emit('DeleteCallType', { "callTypeId": idCallType});
    };
  }]);
