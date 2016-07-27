'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditTeamCtrl', ['$rootScope', '$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($rootScope, $scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.retrievedSDIs = [];
    $scope.availableSDIs = [];
    $scope.selectedSDI = null;

    $scope.retrievedUsers = [];
    $scope.availableUsers = [];
    $scope.selectedUser = null;

    $scope.selectedOwner = 'Not set';

    backendSocket.on('AllSDIDescription', function(response) {
      callbackManager(response, function (allSDIs) {
          $scope.retrievedSDIs = allSDIs;
          $scope.updateSDI();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllSDIDescription');

    backendSocket.on('AllUserDescription', function(response) {
      callbackManager(response, function (allUsers) {
          $scope.retrievedUsers = allUsers;
          $scope.updateUser();
          $scope.updateSelectedOwner();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllUserDescription');

    $scope.sdiTeamName = function (sdi) {
      if (!sdi.team) {
        return "NONE";
      } else {
        return sdi.team.name;
      }
    };

    $scope.updateSelectedOwner = function () {
      if (!$scope.team.owner) {
        $scope.selectedOwner = 'Not set';
      } else {
        var selected = $scope.retrievedUsers.filter(function (element) {return element.id == $scope.team.owner.id;});
        $scope.selectedOwner = ($scope.team.owner && selected.length) ? selected[0].username : 'Not set';
      }
    };

    $scope.userCanBeRemoved = function (userId) {
      if (!$scope.team.owner) {
        return true;
      } else {
        return $scope.team.owner.id != userId;
      }
    };

    $scope.linkOwner = function (userId) {
      $scope.saveTeamAttribute('linkOwner', userId);
      $scope.saveTeamAttribute("addUser", userId);
    };

    $scope.updateSDI = function () {
      $scope.availableSDIs = $filter('filter')($scope.retrievedSDIs, function (value) {
        var filteredList = $filter('filter')($scope.team.sdis, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length == 0;
      });
    };

    $scope.linkSDI = function () {
      if ($scope.selectedSDI != null) {
        $scope.team.sdis.push($filter('filter')($scope.availableSDIs, function (value) {
          return value.id == $scope.selectedSDI;
        })[0]);
        $scope.saveTeamAttribute("addSDI", $scope.selectedSDI);
        $scope.selectedSDI = null;
      }
    };

    $scope.removeSDI = function (sdiId) {
      $scope.saveTeamAttribute("removeSDI", sdiId);
      $scope.team.sdis = $filter('filter')($scope.team.sdis, function (value) {
        return value.id != sdiId;
      });
      $scope.updateSDI();
    };

    $scope.updateUser = function () {
      $scope.availableUsers = $filter('filter')($scope.retrievedUsers, function (value) {
        var filteredList = $filter('filter')($scope.team.users, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length == 0;
      });
    };

    $scope.linkUser = function () {
      if ($scope.selectedUser != null) {
        $scope.team.users.push($filter('filter')($scope.availableUsers, function (value) {
          return value.id == $scope.selectedUser;
        })[0]);
        $scope.saveTeamAttribute("addUser", $scope.selectedUser);
        $scope.selectedUser = null;
      }
    };

    $scope.removeUser = function (userId) {
      $scope.saveTeamAttribute("removeUser", userId);
      $scope.team.users = $filter('filter')($scope.team.users, function (value) {
        return value.id != userId;
      });
      $scope.updateUser();
    };

    backendSocket.on('AnswerUpdateTeam', function(response) {
      callbackManager(response, function (team) {
          $scope.team.complete = team.complete;

          if(team.users.length == 0) {
            saveAttribute("UpdateTeam", team.id, "addUser", $rootScope.user.id);
          } else {
            $scope.updateSDI();
            $scope.updateUser();
          }
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveTeamAttribute = function (element, value) {
      saveAttribute("UpdateTeam", $scope.team.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
