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

      // Routes for authentication
      .when('/', {
        templateUrl: '../common/views/login.html',
        controller: 'T6SCommon.LoginCtrl'
      })

      // Routes for admin stuff
      .when('/admin/', {
        redirectTo: '/admin/source'
      })
      .when('/admin/source', {
        templateUrl: '../admin/views/source/list.html',
        controller: 'T6SAdmin.ListSourceCtrl'
      })
      .when('/admin/source/add', {
        templateUrl: '../admin/views/source/addEdit.html',
        controller: 'T6SAdmin.AddSourceCtrl'
      })
      .when('/admin/source/:sourceId/edit', {
        templateUrl: '../admin/views/source/addEdit.html',
        controller: 'T6SAdmin.EditSourceCtrl'
      })
      .when('/admin/calltype', {
        templateUrl: '../admin/views/calltype/list.html',
        controller: 'T6SAdmin.ListCallTypeCtrl'
      })
      .when('/admin/calltype/add', {
        templateUrl: '../admin/views/calltype/addEdit.html',
        controller: 'T6SAdmin.AddCallTypeCtrl'
      })
      .when('/admin/calltype/:callTypeId/edit', {
        templateUrl: '../admin/views/calltype/addEdit.html',
        controller: 'T6SAdmin.EditCallTypeCtrl'
      })
      .when('/admin/service', {
        templateUrl: '../admin/views/service/list.html',
        controller: 'T6SAdmin.ListServiceCtrl'
      })
      .when('/admin/service/add', {
        templateUrl: '../admin/views/service/addEdit.html',
        controller: 'T6SAdmin.AddServiceCtrl'
      })
      .when('/admin/service/:serviceId/edit', {
        templateUrl: '../admin/views/service/addEdit.html',
        controller: 'T6SAdmin.EditServiceCtrl'
      })

      .when('/custom/', {
        redirectTo: '/'
      })

      // Routes for configuration stuff
      .when('/config/', {
        redirectTo: '/config/sdi'
      })
      .when('/config/oauth/', {
        templateUrl: '../configuration/views/oauth/list.html',
        controller: 'T6SConfiguration.ListOAuthCtrl'
        })
      .when('/config/sdi/', {
          templateUrl: '../configuration/views/sdi/list.html',
          controller: 'T6SConfiguration.ListSDICtrl'
      })
      .when('/config/sdi/add', {
        templateUrl: '../configuration/views/sdi/addEdit.html',
        controller: 'T6SConfiguration.AddSDICtrl'
      })
      .when('/config/sdi/:sdiId/edit', {
        templateUrl: '../configuration/views/sdi/addEdit.html',
        controller: 'T6SConfiguration.EditSDICtrl'
      })
      .when('/config/sdi/:sdiId', {
          templateUrl: '../configuration/views/sdi/show.html',
          controller: 'T6SConfiguration.ShowSDICtrl'
      })
      .when('/config/zone/:zoneId', {
          templateUrl: '../configuration/views/zone/show.html',
          controller: 'T6SConfiguration.ShowZoneCtrl'
      })
      .when('/config/sdi/:sdiId/zone/add', {
        templateUrl: '../configuration/views/zone/addEdit.html',
        controller: 'T6SConfiguration.AddZoneCtrl'
      })
      .when('/config/zone/:zoneId/edit', {
        templateUrl: '../configuration/views/zone/addEdit.html',
        controller: 'T6SConfiguration.EditZoneCtrl'
      })
      .when('/config/zone/:zoneId/calltype/add', {
        templateUrl: '../configuration/views/calltype/addEdit.html',
        controller: 'T6SConfiguration.AddCallTypeCtrl'
      })
      .when('/config/calltype/:callTypeId/edit', {
        templateUrl: '../configuration/views/calltype/addEdit.html',
        controller: 'T6SConfiguration.AddCallTypeCtrl'
      })

      // All other stuff
      .otherwise({
        redirectTo: '/'
      });
  });
