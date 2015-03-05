'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:SourceCtrl
 * @description
 * # SourceCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('SourceCtrl', ['$scope', 'backendSocket', function ($scope, backendSocket) {

    backendSocket.on('AllSourceDescription', function(allSources) {
      console.log("Information : "+allSources);
      $scope.sources = allSources;
    });

    backendSocket.emit('RetrieveAllSourceDescription');

  }]);
