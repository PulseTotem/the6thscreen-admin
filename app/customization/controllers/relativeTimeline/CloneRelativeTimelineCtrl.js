'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:DeleteProfilCtrl
 * @description
 * # DeleteProfilCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.CloneRelativeTimelineCtrl', ['$scope', 'backendSocket', 'callbackManager', 'saveAttribute', function ($scope, backendSocket, callbackManager, saveAttribute) {

    $scope.currentRelativeTimeline = null;

    backendSocket.on('AnswerUpdateRelativeTimeline', function(response) {
      callbackManager(response, function () {
        backendSocket.emit('RetrieveCompleteRelativeTimeline', {'timelineId' : $scope.currentRelativeTimeline});
      })
    });

    backendSocket.on('AnswerCloneZoneContent', function(response) {
      callbackManager(response, function (zoneContent) {
        $scope.currentRelativeTimeline = zoneContent.relativeTimeline.id;
        var newName = zoneContent.relativeTimeline.name+"clone";
        saveAttribute("UpdateRelativeTimeline", $scope.currentRelativeTimeline, "setName", newName);
      })
    });

    $scope.cloneRelativeTimeline = function (relativeTLid) {
      var zoneContentId = $scope.$parent.zoneContentForRelativeTimeline[relativeTLid];
      backendSocket.emit('CloneZoneContent', { "zoneContentId": zoneContentId});
    };

  }]);
