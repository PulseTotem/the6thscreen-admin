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
      $scope.listSDI = [];

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

      $scope.reloadList = function (newList) {
        $scope.listSDI = newList;
      };

      backendSocket.on('AnswerCheckSDICompleteness', function(response) {
        callbackManager(response, function (allSDIs) {
            backendSocket.emit('RetrieveAllSDIDescription');
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      $scope.checkCompleteness = function (sdiId) {
        backendSocket.emit('CheckSDICompleteness', {'SDIid': sdiId});
      };
  }]);
