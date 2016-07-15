'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddTeamCtrl', ['$scope','$rootScope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager, saveAttribute) {

    $scope.team = {};

    backendSocket.on('AnswerCreateTeam', function(response) {
      callbackManager(response, function (team) {
          $scope.team = team;
          saveAttribute("UpdateTeam", team.id, "linkOwner", $rootScope.user.id);

          $scope.team.owner = $rootScope.user;
          $scope.team.users.push($rootScope.user);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("CreateTeam", {});
}]);
