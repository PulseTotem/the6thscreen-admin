'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SourceCtrl
 * @description
 * # SourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListSourceCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope,  backendSocket, callbackManager) {

        backendSocket.userIsLogin(function() {
            backendSocket.on('AllSourceDescription', function(response) {
                callbackManager(response, function (allSources) {
                        $scope.sources = allSources;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );
            });

            backendSocket.on('deletedSource', function(response) {
              callbackManager(response, function (idSource) {
                  $scope.sources = $scope.sources.filter(function (object) {
                    return (object.id != idSource);
                  });

                },
                function (fail) {
                  console.error(fail);
                }
              );
            });

            backendSocket.emit('RetrieveAllSourceDescription');
        });

        $scope.deleteSource = function (idSource) {
          backendSocket.emit('DeleteSource', { "sourceId": idSource});
        };

  }]);
