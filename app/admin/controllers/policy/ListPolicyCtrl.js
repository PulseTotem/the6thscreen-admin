'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListPolicyCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/policy/AddEdit.html";

    $scope.policys = [];

    backendSocket.on('AllPolicyDescription', function(response) {
      callbackManager(response, function (allPolicys) {
          $scope.policys = allPolicys;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeletePolicy', function(response) {
      callbackManager(response, function (idPolicy) {
          $scope.policys = $scope.policys.filter(function (object) {
            return (object.id != idPolicy);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllPolicyDescription');

    $scope.deletePolicy = function (idPolicy) {
      backendSocket.emit('DeletePolicy', { "policyId": idPolicy});
    };

    $scope.createPolicy = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddPolicyCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllPolicyDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editPolicy = function (policy) {

      $scope.policy = policy;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllPolicyDescription');
      }, function () {
        $scope.policy = null;
      });
    };
  }]);
