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
              templateUrl: '../common/views/login.html',
              controller: 'LoginCtrl'
          })

          // Routes for admin stuff
          .when('/source', {
            templateUrl: '../admin/views/source.html',
            controller: 'SourceCtrl'
          })
          .when('/addsource', {
            templateUrl: '../admin/views/addsource.html',
            controller: 'AddsourceCtrl'
          })
          .when('/editsource/:sourceId', {
            templateUrl: '../admin/views/addsource.html',
            controller: 'AddsourceCtrl'
          })
          .when('/calltype', {
            templateUrl: '../admin/views/calltype.html',
            controller: 'CalltypeCtrl'
          })
          .when('/addcalltype', {
            templateUrl: '../admin/views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .when('/editcalltype/:callTypeId', {
            templateUrl: '../admin/views/addcalltype.html',
            controller: 'AddcalltypeCtrl'
          })
          .when('/service', {
            templateUrl: '../admin/views/service.html',
            controller: 'ServiceCtrl'
          })
          .when('/addservice', {
            templateUrl: '../admin/views/addservice.html',
            controller: 'AddserviceCtrl'
          })
          .when('/editservice/:serviceId', {
            templateUrl: '../admin/views/addservice.html',
            controller: 'AddserviceCtrl'
          })



          // Routes for configuration stuff
          .when('/config/sdi/', {
              templateUrl: '../configuration/views/sdi/list.html',
              controller: 'ListSDICtrl'
          })
          .when('/config/sdi/add', {
            templateUrl: '../configuration/views/sdi/addEdit.html',
            controller: 'AddEditSDICtrl'
          })
          .when('/config/sdi/:sdiId/edit', {
            templateUrl: '../configuration/views/sdi/addEdit.html',
            controller: 'AddEditSDICtrl'
          })
          .when('/config/sdi/:sdiId', {
              templateUrl: '../configuration/views/sdi/show.html',
              controller: 'ShowSDICtrl'
          })
          .when('/config/zone/:zoneId', {
              templateUrl: '../configuration/views/zone/show.html',
              controller: 'ShowZoneCtrl'
          })
          .when('/config/sdi/:sdiId/zone/add', {
            templateUrl: '../configuration/views/zone/addEdit.html',
            controller: 'AddEditZoneCtrl'
          })
          .when('/config/zone/:zoneId/edit', {
            templateUrl: '../configuration/views/zone/addEdit.html',
            controller: 'AddEditZoneCtrl'
          })
          .when('/config/zone/:zoneId/calltype/add', {
            templateUrl: '../configuration/views/calltype/addEdit.html',
            controller: 'AddEditCallTypeCtrl'
          })
          .when('/config/calltype/:callTypeId/edit', {
            templateUrl: '../configuration/views/calltype/addEdit.html',
            controller: 'AddEditCallTypeCtrl'
          })

          // All other stuff
          .otherwise({
                redirectTo: '/'
            });
    });
