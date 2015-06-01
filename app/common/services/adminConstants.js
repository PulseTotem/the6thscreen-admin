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
        backendUrl: 'http://localhost:4000/',
        //backendUrl: 'http://t6s-backend.herokuapp.com/',
        adminBackendPath: 'admins',
        loginBackendPath: 'login',
        loginFromTokenBackendPath: 'loginFromToken',
        homeRoute: '/',
        loginRoute: '/custom'
    });
