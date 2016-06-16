'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # MenuCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
    .controller('T6SCommon.MenuCtrl', ['$rootScope', '$scope', '$translate', 'backendSocket', '$cookies', '$location', 'ADMIN_CONSTANTS', function ($rootScope, $scope, $translate, backendSocket, $cookies, $location, ADMIN_CONSTANTS) {

        $scope.langKey = $translate.use();

        $scope.changeLanguage = function (langKey) {
          $scope.langKey = langKey;
          $translate.use(langKey);
        };

        $scope.logout = function() {
          $rootScope.user = {};

          delete($cookies.tmpAdminT6SToken);
          delete($cookies.adminT6SToken);

          backendSocket.exit();

          if (!$rootScope.$$phase) {
            $rootScope.$apply(function () {
              $location.path(ADMIN_CONSTANTS.homeRoute);
            });
          } else {
            $location.path(ADMIN_CONSTANTS.homeRoute);
          }
        };

    }]);
