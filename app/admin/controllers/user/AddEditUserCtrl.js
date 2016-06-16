'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditUserCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.retrievedTeams = [];
    $scope.availableTeams = [];
    $scope.selectedTeam = null;

    backendSocket.on('AllTeamDescription', function(response) {
      callbackManager(response, function (allTeams) {
          $scope.retrievedTeams = allTeams;
          $scope.updateTeam();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllTeamDescription');

    $scope.updateTeam = function () {
      $scope.availableTeams = $filter('filter')($scope.retrievedTeams, function (value) {
        var filteredList = $filter('filter')($scope.user.teams, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length == 0;
      });
    };

    $scope.teamCanBeRemoved = function (teamId) {
      return $scope.user.defaultTeam.id != teamId;
    };

    $scope.linkTeam = function () {
      if ($scope.selectedTeam != null) {
        $scope.user.teams.push($filter('filter')($scope.availableTeams, function (value) {
          return value.id == $scope.selectedTeam;
        })[0]);
        $scope.saveUserAttribute("addTeam", $scope.selectedTeam);
        $scope.selectedTeam = null;
      }
    };

    $scope.removeTeam = function (teamId) {
      $scope.saveUserAttribute("removeTeam", teamId);
      $scope.user.teams = $filter('filter')($scope.user.teams, function (value) {
        return value.id != paramId;
      });
      $scope.updateTeam();
    };

    backendSocket.on('AnswerUpdateUser', function(response) {
      callbackManager(response, function (user) {
          $scope.user.complete = user.complete;
          $scope.updateTeam();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveUserAttribute = function (element, value) {
      saveAttribute("UpdateUser", $scope.user.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
