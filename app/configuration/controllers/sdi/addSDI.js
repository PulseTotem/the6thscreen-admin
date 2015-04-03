'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsdiCtrl
 * @description
 * # AddsdiCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddSDICtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.sdi = {};

      backendSocket.on('SDIDescription', function(response) {
        callbackManager(response, function (sdi) {
            $scope.sdi = sdi;
            linkUser();
          },
          function (fail) {
            console.error(fail);
          }
        );
      });
    });



    var linkUser = function () {
      var usersWithCurrentId = [];

      if ($scope.sdi.users.length > 0) {
        usersWithCurrentId = $scope.sdi.users.filter( function (element) { return (element == $rootScope.user.id); });
      }
      if (usersWithCurrentId.length == 0) {
        $scope.saveAttribute("addUser", $rootScope.user.id);
      }
    };

    $scope.saveAttribute = function (element, value) {
      if (!$scope.sdi.id) {
        backendSocket.emit('CreateSDIDescription', $scope.sdi);
      } else {
        var data = { "id" : $scope.sdi.id, "method": element, "value": value };
        backendSocket.emit("UpdateSDIDescription", data);
      }
    };
  }]);
