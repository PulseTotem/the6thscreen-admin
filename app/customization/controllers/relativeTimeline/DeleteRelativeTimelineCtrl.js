'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DeleteRelativeTimelineCtrl
 * @description
 * # DeleteRelativeTimelineCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.DeleteRelativeTimelineCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

    backendSocket.on('AnswerDeleteZoneContent', function(response) {
      callbackManager(response, function (zoneContentId) {
          backendSocket.emit('RetrieveZoneDescription', {'zoneId' : $scope.zoneId});
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.deleteRelativeTimeline = function(relativeTimelineId) {
      $scope.zone.zoneContents.forEach(function(zc) {
        if(zc.relativeTimeline != null && zc.relativeTimeline.id == relativeTimelineId) {
          backendSocket.emit('DeleteZoneContent', {'zoneContentId' : zc.id});
        }
      });
    };
  }]);
