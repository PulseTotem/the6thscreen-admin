'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SourceCtrl
 * @description
 * # SourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('SourceCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

        backendSocket.userIsLogin(function() {
            backendSocket.on('AllSourceDescription', function(response) {
                callbackManager(response, function (allSources) {
                        console.log("Information : "+allSources);
                        $scope.sources = allSources;
                    },
                    function (fail) {
                        console.error(fail);
                    }
                );
            });

            backendSocket.emit('RetrieveAllSourceDescription');
        });


  }]);
