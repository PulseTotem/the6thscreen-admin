'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowCallCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.callID = $routeParams.callId;
    $scope.sdiId = $routeParams.sdiId;
    $scope.call = {};
    $scope.listParamValues = [];

    backendSocket.userIsLogin(function() {
      backendSocket.on('CallDescription', function(response) {
        callbackManager(response, function (callInfo) {
            $scope.call = callInfo;
          },
          function (fail) {
            console.error(fail);
          }
        );

      });

      backendSocket.on('ParamValuesDescription', function(response) {
        callbackManager(response, function (paramValue) {
            $scope.listParamValues.push(paramValue);
          },
          function (fail) {
            console.error(fail);
          }
        );

      });

      backendSocket.emit('RetrieveCallDescription', {'callId' : $scope.callID});
      backendSocket.emit('RetrieveParamValuesFromCall', {'callId' : $scope.callID});
    });

  }]);
