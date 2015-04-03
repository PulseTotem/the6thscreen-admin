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
              templateUrl: '../configuration/views/main.html',
              controller: 'MainCtrl'
          })
          .when('/dashboard', {
              templateUrl: '../configuration/views/dashboard.html',
              controller: 'DashboardCtrl'
          })
          .when('/sdi/:sdiId', {
              templateUrl: '../configuration/views/sdi.html',
              controller: 'SdiCtrl'
          })
          .when('/zone/:zoneId', {
              templateUrl: '../configuration/views/zone.html',
              controller: 'ZoneCtrl'
          })
          .when('/source', {
              templateUrl: '../configuration/views/source.html',
              controller: 'SourceCtrl'
          })
          .when('/addsource', {
              templateUrl: '../configuration/views/addsource.html',
              controller: 'AddsourceCtrl'
          })
          .when('/editsource/:sourceId', {
            templateUrl: '../configuration/views/addsource.html',
            controller: 'AddsourceCtrl'
          })
          .when('/calltype', {
            templateUrl: '../configuration/views/calltype.html',
            controller: 'CalltypeCtrl'
          })
          .when('/addcalltype', {
            templateUrl: '../configuration/views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .when('/editcalltype/:callTypeId', {
            templateUrl: '../configuration/views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .when('/service', {
            templateUrl: '../configuration/views/service.html',
            controller: 'ServiceCtrl'
          })
          .when('/addservice', {
            templateUrl: '../configuration/views/addservice.html',
            controller: 'AddserviceCtrl'
          })
          .when('/editservice/:serviceId', {
            templateUrl: '../configuration/views/addservice.html',
            controller: 'AddserviceCtrl'
          })
          .when('/addsdi', {
            templateUrl: '../configuration/views/addsdi.html',
            controller: 'AddsdiCtrl'
          })
          .when('/editsdi/:sdiId', {
            templateUrl: '../configuration/views/addsdi.html',
            controller: 'AddsdiCtrl'
          })
          .when('/sdi/:sdiId/zone', {
            templateUrl: '../configuration/views/addzone.html',
            controller: 'AddzoneCtrl'
          })
          .when('/sdi/:sdiId/zone/:zoneId', {
            templateUrl: '../configuration/views/addzone.html',
            controller: 'AddzoneCtrl'
          })
          .when('/sdi/:sdiId/zone/:zoneId/calltype/', {
            templateUrl: '../configuration/views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .otherwise({
                redirectTo: '/'
            });
    });
