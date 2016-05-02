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
    'ngDraggable',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'pascalprecht.translate',
    'btford.socket-io',
    'xeditable',
    'angularSpinner',
    'T6SConfiguration',
    'T6SAdmin',
    'T6SCustomization'
    ])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .run(['editableOptions', function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    }])
    .run(['$rootScope', '$location', '$cookies', '$http', 'ADMIN_CONSTANTS', 'backendSocket', '$route', function($rootScope, $location, $cookies, $http, ADMIN_CONSTANTS, backendSocket, $route) {
      $rootScope.header = "home";

      $rootScope.$on("$routeChangeStart", function(event, next, current) {

        if(typeof($rootScope.user) != "undefined" && typeof($rootScope.user.id) != "undefined") {
          $rootScope.header = "default";

          if($rootScope.user.id == 1 || $rootScope.user.id == 2 || $rootScope.user.username == "simon" || $rootScope.user.username == "christian") {
            if (next.templateUrl === "../common/views/login.html") {
              if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                  $location.path(ADMIN_CONSTANTS.loginRoute);
                });
              } else {
                $location.path(ADMIN_CONSTANTS.loginRoute);
              }
            }
          }
        }
      });

      $rootScope.$on("$locationChangeStart", function(event, next, current) {

        if(typeof($rootScope.user) == "undefined" || typeof($rootScope.user.id) == "undefined") {

          var adminT6SToken = null;
          var tmpToken = false;
          if($cookies.get("adminT6SToken")) {
            console.log("Cookie admin T6S token");
            adminT6SToken = $cookies.get("adminT6SToken");
          } else {
            if($cookies.get("tmpAdminT6SToken")) {
              console.log("TMP TOKEN");
              adminT6SToken = $cookies.get("tmpAdminT6SToken");
              tmpToken = true;
            } else {
              console.log("No cookie token");
            }
          }

          if(adminT6SToken != null) {
            event.preventDefault();

            $http.post(ADMIN_CONSTANTS.backendUrl + ADMIN_CONSTANTS.loginFromTokenBackendPath, {'token' : adminT6SToken, 'tmp' : tmpToken})
              .success(function(data, status, headers, config) {
                var successBackendInit = function() {
                  if(tmpToken) {
                    $cookies.remove("adminT6SToken");
                    $cookies.put("tmpAdminT6SToken",data.token);
                  } else {
                    $cookies.remove("tmpAdminT6SToken");
                    $cookies.put("adminT6SToken",data.token);
                  }

                  /*if(ADMIN_CONSTANTS.backendUrl.indexOf("localhost") <= -1) {
                    alert("/!\\ UTILISATION DU HOST DISTANT !!! /!\\");
                  }*/

                  $route.reload();
                };

                var failBackendInit = function(errorDesc) {
                  console.error(errorDesc);
                  $cookies.remove("adminT6SToken");
                  $cookies.remove("tmpAdminT6SToken");

                  $rootScope.header = "home";
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path(ADMIN_CONSTANTS.homeRoute);
                    });
                  } else {
                    $location.path(ADMIN_CONSTANTS.homeRoute);
                  }
                };

                backendSocket.init(data.token, successBackendInit, failBackendInit);

              })
              .error(function(data, status, headers, config) {
                console.error("Error while authenticating.");
                $cookies.remove("adminT6SToken");
                $cookies.remove("tmpAdminT6SToken");
                $rootScope.header = "home";

                if (!$rootScope.$$phase) {
                  $rootScope.$apply(function () {
                    $location.path(ADMIN_CONSTANTS.homeRoute);
                  });
                } else {
                  $location.path(ADMIN_CONSTANTS.homeRoute);
                }
              });
          } else {
            $rootScope.header = "home";
            console.log("final else");
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                $location.path(ADMIN_CONSTANTS.homeRoute);
              });
            } else {
              $location.path(ADMIN_CONSTANTS.homeRoute);
            }
          }

        }
      });



    }]);
