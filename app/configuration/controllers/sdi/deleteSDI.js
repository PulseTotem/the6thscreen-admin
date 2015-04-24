'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.DeleteSDICtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

    backendSocket.userIsLogin(function() {
      backendSocket.on('deletedSDI', function (response) {
        callbackManager(response, function (sdiId) {
          var newList = $scope.listSDI.filter(function (element) { return (element.id != sdiId); });
          $scope.reloadList(newList);
        })
      });
    });

    $scope.deleteSDI = function (idSDI) {
      backendSocket.emit('DeleteSDI', { "sdiId": idSDI});
    };
  }]);
