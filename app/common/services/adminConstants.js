'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.constant:adminConstants
 * @description
 * # backendSocket Factory
 * Factory of the the6thscreenAdminApp
 */
angular.module('T6SCommon')
    .constant('ADMIN_CONSTANTS', {
        //backendUrl: 'http://localhost:4000/',
        //backendUrl: 'http://backend.pulsetotem.fr/',
        backendUrl: 'http://backend-test.pulsetotem.fr/',

        adminBackendPath: 'admins',
        loginBackendPath: 'login',
        loginFromTokenBackendPath: 'loginFromToken',
        homeRoute: '/',
        loginRoute: '/custom'
    });
