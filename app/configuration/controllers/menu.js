'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DashboardCtrl
 * @description
 * # MenuCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
    .controller('MenuCtrl', ['$rootScope', '$scope', '$translate', 'backendSocket', function ($rootScope, $scope, $translate, backendSocket) {

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }]);
