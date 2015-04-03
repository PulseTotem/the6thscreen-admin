'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddserviceCtrl
 * @description
 * # AddserviceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.EditServiceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.$watch('newService', function() {
          $scope.service = {};
      });



      backendSocket.on('ServiceDescription', function(response) {
        callbackManager(response, function (service) {
            $scope.service = service;

            if ($scope.source) {

              var alreadyInServices = false;
              $scope.services.forEach( function (object) {
                if (object.id == $scope.service.id) {
                  object.name = $scope.service.name;
                  alreadyInServices = true;
                }
              });

              if (!alreadyInServices) {
                $scope.services.push($scope.service);
              }

              if ($scope.source.id) {
                $scope.$parent.saveAttribute("linkService", $scope.service.id);
              }
            }
          },
          function (fail) {
            console.error(fail);
          }
        );
      });
      backendSocket.emit('RetrieveServiceDescriptionOnlyId', {'serviceId' : $routeParams.serviceId});
    });

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.service.id, "method": element, "value": value };
        backendSocket.emit("UpdateServiceDescription", data);
    };
  }]);
