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
      .when('/admin/constraintparamtype', {
        templateUrl: '../admin/views/constraintParamType/List.html',
        controller: 'T6SAdmin.ListConstraintParamTypeCtrl'
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
      .when('/admin/systemtrigger', {
        templateUrl: '../admin/views/systemTrigger/List.html',
        controller: 'T6SAdmin.ListSystemTriggerCtrl'
      })
      .when('/admin/usertrigger', {
        templateUrl: '../admin/views/userTrigger/List.html',
        controller: 'T6SAdmin.ListUserTriggerCtrl'
      })
      .when('/admin/timelinerunner', {
        templateUrl: '../admin/views/timelineRunner/List.html',
        controller: 'T6SAdmin.ListTimelineRunnerCtrl'
      })
      .when('/admin/user', {
        templateUrl: '../admin/views/user/List.html',
        controller: 'T6SAdmin.ListUserCtrl'
      })
      .when('/admin/team', {
        templateUrl: '../admin/views/team/List.html',
        controller: 'T6SAdmin.ListTeamCtrl'
      })
      .when('/admin/provider', {
        templateUrl: '../admin/views/provider/List.html',
        controller: 'T6SAdmin.ListProviderCtrl'
      })
      .when('/admin/tools', {
        templateUrl: '../admin/views/tools/Main.html',
        controller: 'T6SAdmin.MainToolsCtrl'
      })

      // Routes for customization stuff
      .when('/custom/', {
        redirectTo: '/custom/sdi'
      })
      .when('/custom/sdi/', {
        templateUrl: '../configuration/views/sdi/list.html',
        controller: 'T6SConfiguration.ListSDICtrl'
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


      // Routes for configuration stuff
      .when('/config/', {
        redirectTo: '/config/sdi'
      })
      .when('/config/oauth/', {
        templateUrl: '../configuration/views/oauth/list.html',
        controller: 'T6SConfiguration.ListOAuthCtrl'
        })
      .when('/config/oauth/:providerId/add', {
        templateUrl: '../configuration/views/oauth/AddEdit.html',
        controller: 'T6SConfiguration.AddOAuthCtrl'
      })
      .when('/config/oauth/:oauthkeyId/edit', {
        templateUrl: '../configuration/views/oauth/AddEdit.html',
        controller: 'T6SConfiguration.EditOAuthCtrl'
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

      // All other stuff
      .otherwise({
        redirectTo: '/'
      });
  }]);
