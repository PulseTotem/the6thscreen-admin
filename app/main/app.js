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
    .run(['$rootScope', '$location', '$cookies', '$http', 'ADMIN_CONSTANTS', function($rootScope, $location, $cookies, $http, ADMIN_CONSTANTS) {
      $rootScope.header = "home";

      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if(typeof($rootScope.user) == "undefined" || typeof($rootScope.user.id) == "undefined") {
          var bguToken = null;
          var tmpToken = false;
          if($cookies.bguToken) {
            bguToken = $cookies.bguToken;
          } else {
            if($cookies.tmpBguToken) {
              bguToken = $cookies.tmpBguToken;
              tmpToken = true;
            }
          }

          if(bguToken != null) {
            /*
            $http.post(BGU_CONSTANTS.backendUrl + BGU_CONSTANTS.loginFromTokenPath, {'token' : bguToken, 'tmp' : tmpToken})
              .success(function(data, status, headers, config) {
                $rootScope.user = data.user;

                if(tmpToken) {
                  $cookies.tmpBguToken = data.token;
                } else {
                  $cookies.bguToken = data.token;
                }

                $rootScope.header = "default";
                if(next.templateUrl === "views/home.html") {
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path('/dashboard');
                    });
                  } else {
                    $location.path('/dashboard');
                  }
                } // else // it's ok!
              })
              .error(function(data, status, headers, config) {
                delete($cookies.bguToken);
                delete($cookies.tmpBguToken);
                $rootScope.header = "home";
                if(next.templateUrl != "views/home.html") {
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path('/');
                    });
                  } else {
                    $location.path('/');
                  }
                }
              });
              */
            //TODO
            $http.post(ADMIN_CONSTANTS.loginBackendUrl, {'usernameOrEmail' : user.usernameOrEmail, 'password' : encryptedPwd})
              .success(function(data, status, headers, config) {
                $scope.authToken = data.token;

                var successBackendInit = function() {
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path('/config/');
                    });
                  } else {
                    $location.path('/config/');
                  }
                };

                var failBackendInit = function(errorDesc) {
                  console.error(errorDesc);
                };

                backendSocket.init($scope.authToken, successBackendInit, failBackendInit);
              })
              .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                //TODO: Manage error during post => display error message
                console.log("fail login during POST");
              });
            //TODO
          } else {
            $rootScope.header = "home";
            if(next.templateUrl != "../common/views/login.html") {
              if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                  $location.path('/');
                });
              } else {
                $location.path('/');
              }
            }
          }

        } else {
          $rootScope.header = "default";
          if(next.templateUrl === "../common/views/login.html") {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                $location.path('/config');
              });
            } else {
              $location.path('/config');
            }
          }
        }
      });
    }]);
