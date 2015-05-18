'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ServiceCtrl
 * @description
 * # ServiceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SAdmin')
  .controller('T6SAdmin.ListInfoTypeCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope,  backendSocket, callbackManager) {
    backendSocket.on('AllInfoTypeDescription', function(response) {
      callbackManager(response, function (infoTypes) {
          $scope.infoTypes = infoTypes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('deletedInfoType', function(response) {
      callbackManager(response, function (idInfoType) {
          $scope.infoTypes = $scope.infoTypes.filter(function (object) {
            return (object.id != idInfoType);
          });

        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('RetrieveAllInfoTypeDescription');

    $scope.deleteInfoType = function (idInfoType) {
      backendSocket.emit('DeleteInfoType', { "infoTypeId": idInfoType});
    };
  }]);
