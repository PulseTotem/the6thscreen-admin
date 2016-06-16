'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListUserCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/user/AddEdit.html";
    var CONSTANT_MODAL_RESET_PASSWORD = "admin/views/user/ResetPassword.html";

    $scope.users = [];

    backendSocket.on('AllUserDescription', function(response) {
      callbackManager(response, function (allUser) {
          $scope.users = allUser;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteUser', function(response) {
      callbackManager(response, function (idUser) {
          $scope.users = $scope.users.filter(function (object) {
            return (object.id != idUser);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllUserDescription');

    $scope.isCurrentUser = function (userId) {
      return $rootScope.user.id == userId;
    };

    $scope.deleteUser = function (idUser) {
      backendSocket.emit('DeleteUser', { "userId": idUser});
    };

    $scope.createUser = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddUserCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllUserDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editUser = function (user) {

      $scope.user = user;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllUserDescription');
      }, function () {
        $scope.user = null;
      });
    };

    $scope.resetPassword = function (user) {

      $scope.user = user;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_RESET_PASSWORD,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllUserDescription');
      }, function () {
        $scope.user = null;
      });
    };
  }]);
