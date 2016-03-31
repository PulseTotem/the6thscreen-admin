'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddsourceCtrl
 * @description
 * # AddsourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.AddEditRendererCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', '$filter', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute, $filter) {

    $scope.allInfoTypes = [];
    $scope.newRendererThemeName = "";

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

    backendSocket.on('AnswerUpdateRenderer', function(response) {
      callbackManager(response, function (renderer) {
          $scope.newRendererThemeName = "";
          $scope.renderer = renderer;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.saveRendererAttribute = function (element, value) {
      saveAttribute("UpdateRenderer", $scope.renderer.id, element, value);
    };

    $scope.showSelectedInfoType = function () {
      if (!$scope.renderer.infoType) {
        return 'Not set';
      }
      var selected = $filter('filter')($scope.allInfoTypes, {id: $scope.renderer.infoType.id});
      return ($scope.renderer.infoType && selected.length) ? selected[0].name : 'Not set';
    };

    $scope.addNewTheme = function () {
      if ($scope.newRendererThemeName != "") {
        backendSocket.emit('AddThemeToRenderer', {"name" : $scope.newRendererThemeName, "id" : $scope.renderer.id});
      }
    };

    $scope.removeTheme = function(themeId) {
      backendSocket.emit('RemoveThemeFromRenderer', {"themeId" : themeId, "id" : $scope.renderer.id});
    };

    $scope.close = function () {
      $scope.$close();
    };
}]);
