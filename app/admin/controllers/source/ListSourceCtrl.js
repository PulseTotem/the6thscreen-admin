'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListSourceCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/source/AddEdit.html";

    $scope.sources = [];

    backendSocket.on('AllSourceDescription', function(response) {
      callbackManager(response, function (allSources) {
          $scope.sources = allSources;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteSource', function(response) {
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

    $scope.deleteSource = function (idSource) {
      backendSocket.emit('DeleteSource', { "sourceId": idSource});
    };

    $scope.createSource = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddSourceCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllSourceDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editSource = function (source) {

      $scope.source = source;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllSourceDescription');
      }, function () {
        $scope.source = null;
      });
    };
  }]);
