'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowCallTypeCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.callTypeId = $routeParams.callTypeId;

    backendSocket.userIsLogin(function() {
      backendSocket.on('CallTypeDescription', function(response) {
        callbackManager(response, function (callTypeInfo) {
            $scope.callType = callTypeInfo;
          },
          function (fail) {
            console.error(fail);
          }
        );

      });

      backendSocket.emit('RetrieveCallTypeDescription', {'callTypeId' : $scope.callTypeId});
    });

  }]);
