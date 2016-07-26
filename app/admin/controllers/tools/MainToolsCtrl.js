'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.MainToolsCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {
    backendSocket.on('AnswerCheckAllData', function(response) {
      callbackManager(response, function (result) {
          $scope.result = result;
          $scope.resultCheckData = true;
          $scope.analysing = false;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCheckAndRemoveOrphans', function(response) {
      callbackManager(response, function (result) {
          $scope.result = result;
          $scope.resultCheckData = true;
          $scope.analysing = false;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.checkAllData = function () {
      backendSocket.emit('CheckAllData', {});
      $scope.analysing = true;
      $scope.result = null;
      $scope.resultCheckData = false;
    };

    $scope.checkAndRemoveOrphans = function () {
      backendSocket.emit('CheckAndRemoveOrphans', {});
      $scope.analysing = true;
      $scope.result = null;
      $scope.resultCheckData = false;
    };
  }]);
