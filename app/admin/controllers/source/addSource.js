'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddSourceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    var MODAL_SERVICE_CST = 'admin/views/service/addEdit.html';

    backendSocket.userIsLogin(function() {
      $scope.source = {};
      $scope.newService = false;

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
            getParamTypes();
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
            getParamTypes();
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      $scope.modalService = MODAL_SERVICE_CST;
    });

    var getParamTypes = function () {
      $scope.selectedParamTypes = [];

      if ($scope.source && $scope.source.paramTypes && $scope.paramTypes) {
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

    $scope.openModalService = function () {
      $scope.newService = !$scope.newService;
      $('#serviceModal').modal('show');
    }

  }]);
