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
        backendUrl: 'http://t6s-backend.herokuapp.com/',
        adminBackendPath: 'admins',
        loginBackendPath: 'login',
        loginFromTokenBackendPath: 'loginFromToken'
    });
