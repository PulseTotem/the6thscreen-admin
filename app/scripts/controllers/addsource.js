'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('AddsourceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

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
                        $scope.getParamTypes();
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
                  $scope.getParamTypes();
                },
                function (fail) {
                  console.error(fail);
                }
              );
            });

            if ($routeParams.sourceId) {
              backendSocket.emit('RetrieveSourceDescriptionOnlyId', {'sourceId' : $routeParams.sourceId});
            }
        });

        $scope.getParamTypes = function () {
          $scope.selectedParamTypes = [];

          if ($scope.source.paramTypes && $scope.paramTypes) {
            for (var i = 0; i < $scope.source.paramTypes.length; i++) {
              var id = $scope.source.paramTypes[i];
              for (var j = 0; j < $scope.paramTypes.length; j++) {
                var paramType = $scope.paramTypes[j];
                if (id == paramType.id) {
                  $scope.selectedParamTypes.push(paramType);
                }
              }
            }
          }
        };

        $scope.saveAttribute = function (element, value) {
          if (!$scope.source.id) {
            backendSocket.emit('CreateSourceDescription', $scope.source);
          } else {
            var data = { "id" : $scope.source.id, "method": element, "value": value };
            backendSocket.emit("UpdateSourceDescription", data);
          }
        };
  }]);
