'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListRendererCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/renderer/AddEdit.html";

    $scope.renderers = [];

    backendSocket.on('AllRendererDescription', function(response) {
      callbackManager(response, function (allRenderers) {
          allRenderers.forEach(function(renderer) {
            renderer["themesDesc"] = "";
            var themes = [];
            renderer.rendererThemes.forEach(function(theme) {
              themes.push(theme.name);
            });
            renderer["themesDesc"] = themes.join(', ');
          });

          $scope.renderers = allRenderers;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteRenderer', function(response) {
      callbackManager(response, function (idRenderer) {
          backendSocket.emit('RetrieveAllRendererDescription');
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllRendererDescription');

    $scope.deleteRenderer = function (idRenderer) {
      backendSocket.emit('DeleteRenderer', { "rendererId": idRenderer});
    };

    $scope.createRenderer = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddRendererCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllRendererDescription');
      }, function () {
        backendSocket.emit('RetrieveAllRendererDescription');
      });
    };

    $scope.editRenderer = function (renderer) {

      $scope.renderer = renderer;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllRendererDescription');
      }, function () {
        $scope.renderer = null;
      });
    };
  }]);
