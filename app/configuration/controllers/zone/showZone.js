'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.ShowZoneCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.zoneID = $routeParams.zoneId;

    backendSocket.userIsLogin(function() {
        backendSocket.on('ZoneDescription', function(response) {
            callbackManager(response, function (zoneInfo) {
                    $scope.zone = zoneInfo;
                },
                function (fail) {
                    console.error(fail);
                }
            );

        });

        backendSocket.on('deletedCallType', function (response) {
          callbackManager(response, function (callTypeId) {
            $scope.zone.callTypes = $scope.zone.callTypes.filter(function (element) {
              return (element.id != callTypeId);
            });
          },
          function (fail) {
            console.error(fail);
          });
        });

        backendSocket.emit('RetrieveZoneDescription', {'zoneId' : $scope.zoneID});
    });

    $scope.deleteCallType = function (idCallType) {
      backendSocket.emit('DeleteCallType', { "callTypeId": idCallType});
    };

  }]);
