'use strict';

/**
 * @ngdoc service
 * @name the6thscreenAdminApp.callbackManager
 * @description
 * # callbackManager
 * Factory in the the6thscreenAdminApp.
 */
angular.module('the6thscreenAdminApp')
  .factory('callbackManager', function () {
    // Service logic


    return function (message, successCallback, failCallback) {
      if (message.status == 'success') {
        successCallback(message);
      } else {
        failCallback(message);
      }
    }
  });
