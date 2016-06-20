'use strict';

/**
 * @ngdoc service
 * @name the6thscreenAdminApp.callbackManager
 * @description
 * # callbackManager
 * Factory in the the6thscreenAdminApp.
 */
angular.module('T6SCommon')
  .factory('callbackManager', ['$rootScope', function ($rootScope) {

    return function (backendMessage, successCallback, failCallback) {
      if (backendMessage.success == true) {
        successCallback(backendMessage.response);
      } else {
        $rootScope.requestErrors.push(backendMessage.response.message);
        failCallback(backendMessage.response);
      }
    }
  }]);
