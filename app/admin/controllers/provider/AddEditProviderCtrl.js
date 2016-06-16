'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditProviderCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.retrievedSources = [];
    $scope.availableSources = [];
    $scope.selectedSource = null;

    backendSocket.on('AllSourceDescription', function(response) {
      callbackManager(response, function (allSources) {
          $scope.retrievedSources = allSources;
          $scope.updateSource();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllSourceDescription');

    $scope.updateSource = function () {
      $scope.availableSources = $filter('filter')($scope.retrievedSources, function (value) {
        var filteredList = $filter('filter')($scope.provider.sources, function (value2) {
          return value2.id == value.id;
        });
        return filteredList.length == 0;
      });
    };

    $scope.linkSource = function () {
      if ($scope.selectedSource != null) {
        $scope.provider.sources.push($filter('filter')($scope.availableSources, function (value) {
          return value.id == $scope.selectedSource;
        })[0]);
        $scope.saveProviderAttribute("addSource", $scope.selectedSource);
        $scope.selectedSource = null;
      }
    };

    $scope.removeSource = function (sourceId) {
      $scope.saveProviderAttribute("removeSource", sourceId);
      $scope.provider.sources = $filter('filter')($scope.provider.sources, function (value) {
        return value.id != sourceId;
      });
      $scope.updateSource();
    };

    backendSocket.on('AnswerUpdateProvider', function(response) {
      callbackManager(response, function (provider) {
          $scope.provider.complete = provider.complete;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveProviderAttribute = function (element, value) {
      saveAttribute("UpdateProvider", $scope.provider.id, element, value);
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
