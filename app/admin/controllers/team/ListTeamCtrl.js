'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListTeamCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', '$uibModal', function ($rootScope, $scope, backendSocket, callbackManager, $uibModal) {

    var CONSTANT_MODAL_ADD_EDIT_TPT = "admin/views/team/AddEdit.html";

    $scope.teams = [];

    backendSocket.on('AllTeamDescription', function(response) {
      callbackManager(response, function (allTeams) {
          $scope.teams = allTeams;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerDeleteTeam', function(response) {
      callbackManager(response, function (idTeam) {
          $scope.teams = $scope.teams.filter(function (object) {
            return (object.id != idTeam);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllTeamDescription');

    $scope.deleteTeam = function (idTeam) {
      backendSocket.emit('DeleteTeam', { "teamId": idTeam});
    };

    $scope.createTeam = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        controller: 'T6SAdmin.AddTeamCtrl',
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllTeamDescription');
      }, function () {
        $scope.reset_current();
      });
    };

    $scope.editTeam = function (team) {

      $scope.team = team;
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: CONSTANT_MODAL_ADD_EDIT_TPT,
        scope: $scope,
        backdrop: 'static',
        keyboard: false
      });

      modalInstance.result.then(function () {
        backendSocket.emit('RetrieveAllTeamDescription');
      }, function () {
        $scope.user = null;
      });
    };
  }]);
