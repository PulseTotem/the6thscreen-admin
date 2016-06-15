'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ManageTeamOAuthCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.teamRetrievedOAuth = [];
    $scope.teamAvailableOAuth = [];
    $scope.selectedOAuth = null;

    backendSocket.on('OAuthKeyDescriptionForTeam', function(response) {
      callbackManager(response, function (oauthkeys) {
          $scope.teamRetrievedOAuth = oauthkeys;
          $scope.updateOAuthKeys();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveOAuthKeyDescriptionForTeam', {"teamId": $scope.team.id});

    backendSocket.on('AnswerUpdateTeam', function(response) {
      callbackManager(response, function (team) {
          $scope.team.complete = team.complete;
          $scope.updateOAuthKeys();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveTeamAttribute = function (element, value) {
      saveAttribute("UpdateTeam", $scope.team.id, element, value);
    };

    $scope.updateOAuthKeys = function () {
      $scope.teamAvailableOAuth = $filter('filter')($scope.teamRetrievedOAuth, function (value) {
        var filteredList = $filter('filter')($scope.team.oauthkeys, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length == 0;
      });

      $scope.team.oauthkeys = $filter('filter')($scope.teamRetrievedOAuth, function (value) {
        var filteredList = $filter('filter')($scope.team.oauthkeys, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length != 0;
      });
    };

    $scope.linkOAuth = function () {
      if ($scope.selectedOAuth != null) {
        $scope.team.oauthkeys.push($filter('filter')($scope.teamAvailableOAuth, function (value) {
          return value.id == $scope.selectedOAuth;
        })[0]);
        $scope.saveTeamAttribute("addOAuthKey", $scope.selectedOAuth);
        $scope.selectedOAuth = null;
      }
    };

    $scope.removeOAuth = function (oauthId) {
      $scope.saveTeamAttribute("removeOAuthKey", oauthId);
      $scope.team.oauthkeys = $filter('filter')($scope.team.oauthkeys, function (value) {
        return value.id != oauthId;
      });
      $scope.updateOAuthKeys();
    };

    $scope.close = function () {
      $scope.$close();
    };
  }]);
