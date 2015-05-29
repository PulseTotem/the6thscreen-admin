'use strict';

/**
 * @ngdoc service
 * @name the6thscreenAdminApp.saveAttribute
 * @description
 * # callbackManager
 * Factory in the the6thscreenAdminApp.
 */
angular.module('T6SCommon')
  .factory('saveAttribute', ['backendSocket', function (backendSocket) {

    return function (channel, id, element, value) {
      var data = { "id" : id, "method": element, "value": value };
      backendSocket.emit(channel, data);
    };
  }]);
