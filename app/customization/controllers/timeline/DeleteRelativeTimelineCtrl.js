'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DeleteRelativeTimelineCtrl
 * @description
 * # DeleteRelativeTimelineCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.DeleteRelativeTimelineCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', function ($rootScope, $scope, backendSocket, callbackManager) {

    backendSocket.on('deletedSDI', function (response) {
      callbackManager(response, function (sdiId) {
        var newList = $scope.listSDI.filter(function (element) { return (element.id != sdiId); });
        $scope.reloadList(newList);
      })
    });

    $scope.deleteSDI = function (idSDI) {
      backendSocket.emit('DeleteSDI', { "sdiId": idSDI});
    };
  }]);
