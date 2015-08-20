'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCMS')
  .controller('T6SCMS.ListAlbumCtrl', ['$rootScope', '$scope', '$http', '$routeParams', function ($rootScope, $scope, $http, $routeParams) {

    var REST_PATH = {
      "DOMAIN": "http://localhost:6012/rest/",
      "TAGS": "tags/",
      "KILLSESSION": "lastsession/"
    };

    $scope.tags = [];

    $http.get(REST_PATH["DOMAIN"]+REST_PATH["TAGS"]).then(function (response) {
      $scope.tags = response.data;
    });

    $scope.killSession = function () {
      $http.delete(REST_PATH["DOMAIN"]+REST_PATH["KILLSESSION"]);
    };
}]);
