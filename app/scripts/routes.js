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
          .when('/editsource/:sourceId', {
            templateUrl: 'views/addsource.html',
            controller: 'AddsourceCtrl'
          })
          .when('/calltype', {
            templateUrl: 'views/calltype.html',
            controller: 'CalltypeCtrl'
          })
          .when('/addcalltype', {
            templateUrl: 'views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .when('/editcalltype/:callTypeId', {
            templateUrl: 'views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .when('/service', {
            templateUrl: 'views/service.html',
            controller: 'ServiceCtrl'
          })
          .when('/addservice', {
            templateUrl: 'views/addservice.html',
            controller: 'AddserviceCtrl'
          })
          .when('/editservice/:serviceId', {
            templateUrl: 'views/addservice.html',
            controller: 'AddserviceCtrl'
          })
          .when('/addsdi', {
            templateUrl: 'views/addsdi.html',
            controller: 'AddsdiCtrl'
          })
          .when('/editsdi/:sdiId', {
            templateUrl: 'views/addsdi.html',
            controller: 'AddsdiCtrl'
          })
          .when('/sdi/:sdiId/zone', {
            templateUrl: 'views/addzone.html',
            controller: 'AddzoneCtrl'
          })
          .when('/sdi/:sdiId/zone/:zoneId', {
            templateUrl: 'views/addzone.html',
            controller: 'AddzoneCtrl'
          })
          .otherwise({
                redirectTo: '/'
            });
    });
