'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('the6thscreenAdminApp')
  .controller('MainCtrl', ['$scope', 'backendSocket', function ($scope, backendSocket) {
    backendSocket.on('SingInStatus', function(singInStatus) {
        $scope.singInStatus = singInStatus.SingInStatus;
    });

    backendSocket.emit('SignIn', {'test' : 'test'});

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
