'use strict';

/**
 * @ngdoc overview
 * @name the6thscreenAdminApp
 * @description
 * # routes
 *
 * Define routes available in application.
 */
angular
    .module('the6thscreenAdminApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/sdi/:sdiId', {
                templateUrl: 'views/sdi.html',
                controller: 'SdiCtrl'
            })
            .when('/zone/:zoneId', {
                templateUrl: 'views/zone.html',
                controller: 'ZoneCtrl'
            })
            .when('/source', {
                templateUrl: 'views/source.html',
                controller: 'SourceCtrl'
            })
            .when('/addsource', {
                templateUrl: 'views/addsource.html',
                controller: 'AddsourceCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
