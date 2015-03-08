'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('AddsourceCtrl', ['$scope','backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

        backendSocket.userIsLogin(function() {
            backendSocket.on('AllInfoTypeDescription', function(allInfoTypes) {
                $scope.infoTypes = allInfoTypes;
            });

            backendSocket.emit('RetrieveAllInfoTypeDescription');

            backendSocket.on('AllParamTypeDescription', function(allParamTypes) {
                $scope.paramTypes = allParamTypes;
            });

            backendSocket.emit('RetrieveAllParamTypeDescription');
        });



        $scope.save = function () {
          backendSocket.on('sourceSaved', function (message) {
            callbackManager(message, function (success) {
                console.log("save ok");
                console.log(JSON.stringify(success));
              },
              function (fail) {
                console.error(fail);
              }
            );
          });
          backendSocket.emit('SaveSourceDescription', $scope.source);
        };
  }]);
