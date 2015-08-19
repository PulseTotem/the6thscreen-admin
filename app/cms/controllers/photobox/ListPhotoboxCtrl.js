'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCMS')
  .controller('T6SCMS.ListPhotoboxCtrl', ['$rootScope', '$scope', '$http', '$routeParams', function ($rootScope, $scope, $http, $routeParams) {

    var REST_PATH = {
      "DOMAIN": "http://localhost:6012/rest/",
      "ALLPICS": "allpics/",
      "KILLSESSION": "lastsession/",
      "DELETEPIC": "picture/",
      "SCANDIR": "scans/"
    };

    $scope.tag = $routeParams.tag;
    $scope.pictures = [];

    $http.get(REST_PATH["DOMAIN"]+REST_PATH["ALLPICS"]+$scope.tag).then(function (response) {
      $scope.pictures = response.data;
    });

    $scope.scanPictures = function () {
      $http.post(REST_PATH["DOMAIN"]+REST_PATH["SCANDIR"]+$scope.tag);
    };

    $scope.killSession = function () {
      $http.delete(REST_PATH["DOMAIN"]+REST_PATH["KILLSESSION"]);
    };

    $scope.deletePicture = function (pictureId) {
      $http.delete(REST_PATH["DOMAIN"]+REST_PATH["DELETEPIC"]+$scope.tag+"/"+pictureId).then( function (response) {
        $http.get(REST_PATH["DOMAIN"]+REST_PATH["ALLPICS"]).then(function (response) {
          $scope.pictures = response.data;
        });
      });
    };
}]);
