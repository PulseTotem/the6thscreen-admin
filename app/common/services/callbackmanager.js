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

    return function (backendMessage, successCallback, failCallback) {
      if (backendMessage.success == true) {
        successCallback(backendMessage.response);
      } else {
        failCallback(backendMessage.response);
      }
    }
  });
