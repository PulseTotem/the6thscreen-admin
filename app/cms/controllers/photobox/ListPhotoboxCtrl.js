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
      "DOMAIN": "http://service-photobox.pulsetotem.fr/rest/",
      "ALLPICS": "allpics/",
      "DELETEPIC": "picture/",
      "SCANDIR": "scan/"
    };

    $scope.tag = $routeParams.tag;
    $scope.pictures = [];

    $http.get(REST_PATH["DOMAIN"]+REST_PATH["ALLPICS"]+$scope.tag).then(function (response) {
      $scope.pictures = response.data;
    });

    $scope.scanPictures = function () {
      $http.post(REST_PATH["DOMAIN"]+REST_PATH["SCANDIR"]+$scope.tag);
    };

    $scope.deletePicture = function (pictureId) {
      $http.delete(REST_PATH["DOMAIN"]+REST_PATH["DELETEPIC"]+$scope.tag+"/"+pictureId).then( function (response) {
        $http.get(REST_PATH["DOMAIN"]+REST_PATH["ALLPICS"]+$scope.tag).then(function (response) {
          $scope.pictures = response.data;
        });
      });
    };
}]);
