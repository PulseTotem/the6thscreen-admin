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
        adminBackendUrl: 'http://t6s-backend.herokuapp.com/admins',
        loginBackendUrl: 'http://t6s-backend.herokuapp.com/login'
    });