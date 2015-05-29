'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:EditProfilCtrl
 * @description
 * # EditProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.EditProfilCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.profilId = $routeParams.profilId;
    $scope.sdiId = $routeParams.sdiId;
  }]);
