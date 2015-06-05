'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditSourceCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.allInfoTypes = [];
    $scope.allServices = [];
    $scope.availableParameters = [];
    $scope.selectedParam = null;

    backendSocket.on('AllInfoTypeDescription', function(response) {
      callbackManager(response, function (allInfoTypes) {
          $scope.allInfoTypes = allInfoTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllInfoTypeDescription');

    backendSocket.on('AllServiceDescription', function(response) {
      callbackManager(response, function (allServices) {
          $scope.allServices = allServices;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllServiceDescription');

    backendSocket.on('AllParamTypeDescription', function(response) {
      callbackManager(response, function (allParamTypes) {
          $scope.availableParameters = allParamTypes;
          $scope.updateParamType();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllParamTypeDescription');

    backendSocket.on('AnswerUpdateSource', function(response) {
      callbackManager(response, function (source) {
          $scope.source.complete = source.complete;
          $scope.updateParamType();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveSourceAttribute = function (element, value) {
      saveAttribute("UpdateSource", $scope.source.id, element, value);
    };

    $scope.updateParamType = function () {
      $scope.availableParameters = $filter('filter')($scope.availableParameters, function (value) {
        var filteredList = $filter('filter')($scope.source.paramTypes, {id: value.id});
        return filteredList.length == 0;
      });
    };

    $scope.linkParamType = function () {
      if ($scope.selectedParam != null) {
        $scope.source.paramTypes.push($filter('filter')($scope.availableParameters, {id: $scope.selectedParam})[0]);
        $scope.saveSourceAttribute("addParamType", $scope.selectedParam);
        $scope.selectedParam = null;
      }
    };

    $scope.removeParamType = function (paramId) {
      $scope.saveSourceAttribute("removeParamType", paramId);
      $scope.source.paramTypes = $filter('filter')($scope.source.paramTypes, function (value) {
        return value.id != paramId;
      });
    };

    $scope.showSelectedInfoType = function () {
      if (!$scope.source.infoType) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.allInfoTypes, {id: $scope.source.infoType.id});
      return ($scope.source.infoType && selected.length) ? selected[0].name : 'Not set';
    };

    $scope.showSelectedService = function () {
      if (!$scope.source.service) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.allServices, {id: $scope.source.service.id});
      return ($scope.source.service && selected.length) ? selected[0].name : 'Not set';
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
