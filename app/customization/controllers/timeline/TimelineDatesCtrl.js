'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:TimelineDatesCtrl
 * @description
 * # TimelineDatesCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.TimelineDatesCtrl', ['$scope', function ($scope) {

    /**
     * Formate l'objet Date sous la forme yyyy-mm-dd
     *
     * @param date
     * @returns {string}
     */
    $scope.getYyyymmdd = function (date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth() + 1).toString();
      var dd = date.getDate().toString();
      return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]);
    };

    $scope.clear = function (value) {
      if (value === 'creation') {
        $scope.dt1 = null;
        $scope.dt2 = null;
      } else if (value === 'modification') {
        $scope.dt3 = null;
        $scope.dt4 = null;
      }
    };

    $scope.open = function ($event, opened) {
      $event.preventDefault();
      $event.stopPropagation();
      var dateValue1, dateValue2, keywords1, keywords2;

      if (opened === 'opened1' && $scope.dt2 !== undefined && $scope.dt2 !== null) {
        dateValue1 = $scope.getYyyymmdd(new Date());
        dateValue2 = $scope.getDateValue($scope.dt2);
        keywords1 = dateValue1.split('-');
        keywords2 = dateValue2.split('-');
        if (keywords1[0] < keywords2[0] ||
          keywords1[0] === keywords2[0] && keywords1[1] < keywords2[1] ||
          keywords1[0] === keywords2[0] && keywords1[1] === keywords2[1] && keywords1[2] < keywords2[2]) {
          $scope.maxDate = dateValue1;
        } else if (keywords1[0] > keywords2[0] ||
          keywords1[0] === keywords2[0] && keywords1[1] > keywords2[1] ||
          keywords1[0] === keywords2[0] && keywords1[1] === keywords2[1] && keywords1[2] > keywords2[2]) {
          $scope.maxDate = dateValue2;
        } else {
          $scope.maxDate = dateValue1;
        }
      } else if (opened === 'opened3' && $scope.dt4 !== undefined && $scope.dt4 !== null) {
        dateValue1 = $scope.getYyyymmdd(new Date());
        dateValue2 = $scope.getDateValue($scope.dt4);
        keywords1 = dateValue1.split('-');
        keywords2 = dateValue2.split('-');
        if (keywords1[0] < keywords2[0] ||
          keywords1[0] === keywords2[0] && keywords1[1] < keywords2[1] ||
          keywords1[0] === keywords2[0] && keywords1[1] === keywords2[1] && keywords1[2] < keywords2[2]) {
          $scope.maxDate = dateValue1;
        } else if (keywords1[0] > keywords2[0] ||
          keywords1[0] === keywords2[0] && keywords1[1] > keywords2[1] ||
          keywords1[0] === keywords2[0] && keywords1[1] === keywords2[1] && keywords1[2] > keywords2[2]) {
          $scope.maxDate = dateValue2;
        } else {
          $scope.maxDate = dateValue1;
        }
      } else if (opened === 'opened1' || opened === 'opened2' || opened === 'opened3' || opened === 'opened4') {
        $scope.maxDate = $scope.getYyyymmdd(new Date());
      }

      $scope[opened] = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['yyyy-MM-dd'];
    $scope.format = $scope.formats[0];


    /**
     * Formatte
     * Wed May 06 2015 00:00:00 GMT+0200 (Paris, Madrid (heure d’été))
     * sous la forme
     * 2015-05-06
     *
     * @param date
     */
    $scope.getDateValue = function (date) {
      if (date === undefined) {
        return '';
      }
      var keywords = date.toString().split(' ');
      var res = keywords[3] + '-';
      switch (keywords[1].toLowerCase()) {
        case 'jan':
          res += '01';
          break;
        case 'feb':
          res += '02';
          break;
        case 'mar':
          res += '03';
          break;
        case 'apr':
          res += '04';
          break;
        case 'may':
          res += '05';
          break;
        case 'jun':
          res += '06';
          break;
        case 'jul':
          res += '07';
          break;
        case 'aug':
          res += '08';
          break;
        case 'sep':
          res += '09';
          break;
        case 'oct':
          res += '10';
          break;
        case 'nov':
          res += '11';
          break;
        case 'dec':
          res += '12';
          break;
      }

      res += '-';
      res += keywords[2];
      return res;
    };

  }]);
