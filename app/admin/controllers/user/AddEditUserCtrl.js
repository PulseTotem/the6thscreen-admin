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

    $scope.retrievedSDIs = [];
    $scope.availableSDIs = [];
    $scope.selectedSDI = null;

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

    $scope.updateSDI = function () {
      $scope.availableSDIs = $filter('filter')($scope.retrievedSDIs, function (value) {
        var filteredList = $filter('filter')($scope.user.sdis, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length == 0;
      });
    };

    $scope.linkSDI = function () {
      if ($scope.selectedSDI != null) {
        $scope.user.sdis.push($filter('filter')($scope.availableSDIs, function (value) {
          return value.id == $scope.selectedSDI;
        })[0]);
        $scope.saveUserAttribute("addSDI", $scope.selectedSDI);
        $scope.selectedSDI = null;
      }
    };

    $scope.removeSDI = function (sdiId) {
      $scope.saveUserAttribute("removeSDI", sdiId);
      $scope.user.sdis = $filter('filter')($scope.user.sdis, function (value) {
        return value.id != paramId;
      });
      $scope.updateSDI();
    };

    backendSocket.on('AnswerUpdateUser', function(response) {
      callbackManager(response, function (user) {
          $scope.user.complete = user.complete;
          $scope.updateSDI();
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
