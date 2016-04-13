'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListServiceCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_PARAMTYPE = "admin/views/service/AddEdit.html";

    $scope.services = [];

    backendSocket.on('AllServiceDescription', function(response) {
      callbackManager(response, function (allServices) {
          $scope.services = allServices;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteService', function(response) {
      callbackManager(response, function (idService) {
          $scope.services = $scope.services.filter(function (object) {
            return (object.id != idService);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllServiceDescription');

    $scope.deleteService = function (idService) {
      backendSocket.emit('DeleteService', { "serviceId": idService});
    };

    $scope.createService = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_PARAMTYPE,
        controller: 'T6SAdmin.AddServiceCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllServiceDescription');
      }, function () {
        $scope.service = null;
      });
    };

    $scope.editService = function (service) {

      $scope.service = service;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_PARAMTYPE,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllServiceDescription');
      }, function () {
        $scope.service = null;
      });
    };
  }]);
