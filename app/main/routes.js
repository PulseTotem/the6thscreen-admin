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
  .config(['$routeProvider', function ($routeProvider) {
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
      .when('/admin/service', {
        templateUrl: '../admin/views/service/List.html',
        controller: 'T6SAdmin.ListServiceCtrl'
      })
      .when('/admin/infotype', {
        templateUrl: '../admin/views/infoType/List.html',
        controller: 'T6SAdmin.ListInfoTypeCtrl'
      })
      .when('/admin/paramtype', {
        templateUrl: '../admin/views/paramType/List.html',
        controller: 'T6SAdmin.ListParamTypeCtrl'
      })
      .when('/admin/typeparamtype', {
        templateUrl: '../admin/views/typeParamType/List.html',
        controller: 'T6SAdmin.ListTypeParamTypeCtrl'
      })
      .when('/admin/themezone', {
        templateUrl: '../admin/views/themeZone/List.html',
        controller: 'T6SAdmin.ListThemeZoneCtrl'
      })
      .when('/admin/themesdi', {
        templateUrl: '../admin/views/themeSDI/List.html',
        controller: 'T6SAdmin.ListThemeSDICtrl'
      })
      .when('/admin/source', {
        templateUrl: '../admin/views/source/List.html',
        controller: 'T6SAdmin.ListSourceCtrl'
      })
      .when('/admin/renderer', {
        templateUrl: '../admin/views/renderer/List.html',
        controller: 'T6SAdmin.ListRendererCtrl'
      })
      .when('/admin/behaviour', {
        templateUrl: '../admin/views/behaviour/List.html',
        controller: 'T6SAdmin.ListBehaviourCtrl'
      })
      .when('/admin/policy', {
        templateUrl: '../admin/views/policy/List.html',
        controller: 'T6SAdmin.ListPolicyCtrl'
      })
      .when('/admin/systemTrigger', {
        templateUrl: '../admin/views/systemTrigger/List.html',
        controller: 'T6SAdmin.ListSystemTriggerCtrl'
      })
      .when('/admin/userTrigger', {
        templateUrl: '../admin/views/userTrigger/List.html',
        controller: 'T6SAdmin.ListUserTriggerCtrl'
      })

      // Routes for customization stuff
      .when('/custom/', {
        redirectTo: '/custom/sdi'
      })
      .when('/custom/sdi/', {
        templateUrl: '../customization/views/sdi/List.html',
        controller: 'T6SCustomization.ListSDICtrl'
      })
      .when('/custom/sdi/:sdiId', {
        templateUrl: '../customization/views/sdi/Show.html',
        controller: 'T6SCustomization.ShowSDICtrl'
      })
      .when('/custom/sdi/:sdiId/zone/:zoneId', {
        templateUrl: '../customization/views/zone/Show.html',
        controller: 'T6SCustomization.ShowZoneCtrl'
      })
      .when('/custom/sdi/:sdiId/zone/:zoneId/relative/new', {
        templateUrl: '../customization/views/relativeTimeline/AddEdit/AddEdit.html',
        controller: 'T6SCustomization.AddRelativeTimelineCtrl'
      })
      .when('/custom/sdi/:sdiId/zone/:zoneId/relative/:timelineId', {
        templateUrl: '../customization/views/relativeTimeline/AddEdit/AddEdit.html',
        controller: 'T6SCustomization.EditRelativeTimelineCtrl'
      })
      .when('/custom/sdi/:sdiId/profil/new', {
        templateUrl: '../customization/views/profil/AddEdit.html',
        controller: 'T6SCustomization.AddProfilCtrl'
      })
      .when('/custom/sdi/:sdiId/profil/:profilId', {
        templateUrl: '../customization/views/profil/Show.html',
        controller: 'T6SCustomization.ShowProfilCtrl'
      })
      .when('/custom/sdi/:sdiId/profil/:profilId/edit', {
        templateUrl: '../customization/views/profil/AddEdit.html',
        controller: 'T6SCustomization.EditProfilCtrl'
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
        templateUrl: '../customization/views/call/AddEdit.html',
        controller: 'T6SCustomization.EditCallCtrl'
      })
      .when('/custom/sdi/:sdiId/call/:callId', {
        templateUrl: '../customization/views/call/show.html',
        controller: 'T6SCustomization.ShowCallCtrl'
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
  }]);
