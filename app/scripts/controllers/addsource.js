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
            backendSocket.on('AllInfoTypeDescription', function(response) {
                callbackManager(response, function (allInfoTypes) {
                        $scope.infoTypes = allInfoTypes;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );
            });

            backendSocket.emit('RetrieveAllInfoTypeDescription');

            backendSocket.on('AllParamTypeDescription', function(response) {
                callbackManager(response, function (allParamTypes) {
                        $scope.paramTypes = allParamTypes;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );
            });

            backendSocket.emit('RetrieveAllParamTypeDescription');
        });

        $scope.save = function () {
          backendSocket.on('sourceSaved', function (response) {
            callbackManager(response, function (success) {
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
