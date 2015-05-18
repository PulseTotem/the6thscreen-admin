'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ServiceCtrl
 * @description
 * # ServiceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListRendererCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope,  backendSocket, callbackManager) {
    backendSocket.on('AllRendererDescription', function(response) {
      callbackManager(response, function (allRenderers) {
          $scope.renderers = allRenderers;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('deletedRenderer', function(response) {
      callbackManager(response, function (idRenderer) {
          $scope.renderers = $scope.renderers.filter(function (object) {
            return (object.id != idRenderer);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllRendererDescription');

    $scope.deleteRenderer = function (idRenderer) {
      backendSocket.emit('DeleteRenderer', { "rendererId": idRenderer});
    };
  }]);
