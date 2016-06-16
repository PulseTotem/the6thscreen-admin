'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListProviderCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/provider/AddEdit.html";

    $scope.providers = [];

    backendSocket.on('AllProviderDescription', function(response) {
      callbackManager(response, function (allProviders) {
          $scope.providers = allProviders;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteProvider', function(response) {
      callbackManager(response, function (idProvider) {
          $scope.providers = $scope.providers.filter(function (object) {
            return (object.id != idProvider);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllProviderDescription');

    $scope.deleteProvider = function (idProvider) {
      backendSocket.emit('DeleteProvider', { "providerId": idProvider});
    };

    $scope.createProvider = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddProviderCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllProviderDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editProvider = function (provider) {

      $scope.provider = provider;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllProviderDescription');
      }, function () {
        $scope.provider = null;
      });
    };
  }]);
