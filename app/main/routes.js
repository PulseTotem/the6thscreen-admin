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
      .when('/admin/renderer', {
        templateUrl: '../admin/views/renderer/list.html',
        controller: 'T6SAdmin.ListRendererCtrl'
      })
      .when('/admin/renderer/add', {
        templateUrl: '../admin/views/renderer/addEdit.html',
        controller: 'T6SAdmin.AddRendererCtrl'
      })
      .when('/admin/renderer/:rendererId/edit', {
        templateUrl: '../admin/views/renderer/addEdit.html',
        controller: 'T6SAdmin.EditRendererCtrl'
      })
      .when('/admin/infotype', {
        templateUrl: '../admin/views/infoType/list.html',
        controller: 'T6SAdmin.ListInfoTypeCtrl'
      })
      .when('/admin/infotype/add', {
        templateUrl: '../admin/views/infoType/addEdit.html',
        controller: 'T6SAdmin.AddInfoTypeCtrl'
      })
      .when('/admin/infotype/:infoTypeId/edit', {
        templateUrl: '../admin/views/infoType/addEdit.html',
        controller: 'T6SAdmin.EditInfoTypeCtrl'
      })
      .when('/admin/zone/', {
        templateUrl: '../admin/views/zone/list.html',
        controller: 'T6SAdmin.ListZoneCtrl'
      })

      // Routes for customization stuff
      .when('/custom/', {
        redirectTo: '/custom/sdi'
      })
      .when('/custom/sdi/', {
        templateUrl: '../customization/views/sdi/list.html',
        controller: 'T6SCustomization.ListSDICtrl'
      })
      .when('/custom/sdi/:sdiId', {
        templateUrl: '../customization/views/sdi/show.html',
        controller: 'T6SCustomization.ShowSDICtrl'
      })
      .when('/custom/sdi/:sdiId/zone/:zoneId', {
        templateUrl: '../customization/views/zone/show.html',
        controller: 'T6SCustomization.ShowZoneCtrl'
      })

      //TODO: Need yet ?

      .when('/custom/sdi/:sdiId/calltype/:callTypeId', {
        templateUrl: '../customization/views/calltype/show.html',
        controller: 'T6SCustomization.ShowCallTypeCtrl'
      })
      .when('/custom/sdi/:sdiId/calltype/:callTypeId/call/add', {
        templateUrl: '../customization/views/call/addEdit.html',
        controller: 'T6SCustomization.AddCallCtrl'
      })
      .when('/custom/sdi/:sdiId/calltype/:callTypeId/call/:callId/edit', {
        templateUrl: '../customization/views/call/addEdit.html',
        controller: 'T6SCustomization.EditCallCtrl'
      })
      .when('/custom/sdi/:sdiId/call/:callId', {
        templateUrl: '../customization/views/call/show.html',
        controller: 'T6SCustomization.ShowCallCtrl'
      })
      .when('/custom/sdi/:sdiId/profil/add', {
        templateUrl: '../customization/views/profil/addEdit.html',
        controller: 'T6SCustomization.AddProfilCtrl'
      })
      .when('/custom/sdi/:sdiId/profil/:profilId', {
        templateUrl: '../customization/views/profil/show.html',
        controller: 'T6SCustomization.ShowProfilCtrl'
      })
      .when('/custom/sdi/:sdiId/profil/:profilId/edit', {
        templateUrl: '../customization/views/profil/addEdit.html',
        controller: 'T6SCustomization.EditProfilCtrl'
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
        templateUrl: '../configuration/views/sdi/configuration/AddEdit.html',
        controller: 'T6SConfiguration.AddSDICtrl'
      })
      .when('/config/sdi/:sdiId/edit', {
        templateUrl: '../configuration/views/sdi/configuration/AddEdit.html',
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
