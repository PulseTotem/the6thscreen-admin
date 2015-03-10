'use strict';

/**
 * @ngdoc overview
 * @name the6thscreenAdminApp
 * @description
 * # the6thscreenAdminApp
 *
 * Main module of the application.
 */
angular
    .module('the6thscreenAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'btford.socket-io'
    ])
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    })
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
