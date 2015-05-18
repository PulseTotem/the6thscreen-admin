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
    'btford.socket-io',
    'T6SConfiguration',
    'T6SAdmin',
    'T6SCustomization'
    ])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .run(['$rootScope', '$location', '$cookies', '$http', 'ADMIN_CONSTANTS', 'backendSocket', function($rootScope, $location, $cookies, $http, ADMIN_CONSTANTS, backendSocket) {
      $rootScope.header = "home";

      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if(typeof($rootScope.user) == "undefined" || typeof($rootScope.user.id) == "undefined") {
          var adminT6SToken = null;
          var tmpToken = false;
          if($cookies.adminT6SToken) {
            adminT6SToken = $cookies.adminT6SToken;
          } else {
            if($cookies.tmpAdminT6SToken) {
              adminT6SToken = $cookies.tmpAdminT6SToken;
              tmpToken = true;
            }
          }

          if(adminT6SToken != null) {
            $http.post(ADMIN_CONSTANTS.backendUrl + ADMIN_CONSTANTS.loginFromTokenBackendPath, {'token' : adminT6SToken, 'tmp' : tmpToken})
              .success(function(data, status, headers, config) {
                console.log("POST SUCCESS!!!");
                var successBackendInit = function() {
                  console.log("BACKEND SUCCESS!!!");
                  if(tmpToken) {
                    delete($cookies.adminT6SToken);
                    $cookies.tmpAdminT6SToken = data.token;
                  } else {
                    delete($cookies.tmpAdminT6SToken);
                    $cookies.adminT6SToken = data.token;
                  }

                  $rootScope.header = "default";
                  if(next.templateUrl === "../common/views/login.html") {
                    if (!$rootScope.$$phase) {
                      $rootScope.$apply(function () {
                        $location.path(ADMIN_CONSTANTS.loginRoute);
                      });
                    } else {
                      $location.path(ADMIN_CONSTANTS.loginRoute);
                    }
                  }
                };

                var failBackendInit = function(errorDesc) {
                  console.error(errorDesc);
                  delete($cookies.adminT6SToken);
                  delete($cookies.tmpAdminT6SToken);
                  $rootScope.header = "home";
                  if(next.templateUrl != "../common/views/login.html") {
                    if (!$rootScope.$$phase) {
                      $rootScope.$apply(function () {
                        $location.path(ADMIN_CONSTANTS.homeRoute);
                      });
                    } else {
                      $location.path(ADMIN_CONSTANTS.homeRoute);
                    }
                  }
                };

                backendSocket.init(data.token, successBackendInit, failBackendInit);

              })
              .error(function(data, status, headers, config) {
                delete($cookies.adminT6SToken);
                delete($cookies.tmpAdminT6SToken);
                $rootScope.header = "home";
                if(next.templateUrl != "../common/views/login.html") {
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path(ADMIN_CONSTANTS.homeRoute);
                    });
                  } else {
                    $location.path(ADMIN_CONSTANTS.homeRoute);
                  }
                }
              });
            console.log("Et oui ASYNC !!!");
          } else {
            $rootScope.header = "home";
            if(next.templateUrl != "../common/views/login.html") {
              if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                  $location.path(ADMIN_CONSTANTS.homeRoute);
                });
              } else {
                $location.path(ADMIN_CONSTANTS.homeRoute);
              }
            }
          }

        } else {
          $rootScope.header = "default";
          if(next.templateUrl === "../common/views/login.html") {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                $location.path(ADMIN_CONSTANTS.loginRoute);
              });
            } else {
              $location.path(ADMIN_CONSTANTS.loginRoute);
            }
          }
        }
      });
    }]);
