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

            backendSocket.emit('RetrieveAllInfoTypeDescription')

            backendSocket.on('AllServiceDescription', function(response) {
              callbackManager(response, function (allServices) {
                  $scope.services = allServices;
                },
                function (fail) {
                  console.error(fail);
                }
              );
            });

            backendSocket.emit('RetrieveAllServiceDescription');

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

            backendSocket.on('SourceDescription', function(response) {
              callbackManager(response, function (source) {
                  $scope.source = source;
                },
                function (fail) {
                  console.error(fail);
                }
              );
            });
        });

        $scope.saveAttribute = function (element, value) {
          if (!$scope.source.id) {
            backendSocket.emit('CreateSourceDescription', $scope.source);
          } else {
            var data = { "id" : $scope.source.id, "method": element, "value": value };
            backendSocket.emit("UpdateSourceDescription", data);
          }
        };
  }]);
