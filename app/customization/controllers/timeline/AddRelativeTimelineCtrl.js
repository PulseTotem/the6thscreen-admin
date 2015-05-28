'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditRelativeTimelineCtrl
 * @description
 * # AddRelativeTimelineCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddRelativeTimelineCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {
    $scope.zoneId = $routeParams.zoneId;
    $scope.sdiId = $routeParams.sdiId;

    $scope.timelineId = -1;
    $scope.zoneContentId = -1;

    $scope.timeline = {};
    $scope.timelineName = "";

    backendSocket.on('CompleteRelativeTimelineDescription', function(response) {
      callbackManager(response, function (timelineInfo) {
          $scope.timeline = timelineInfo;
          $scope.timelineName = timelineInfo.name;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerUpdateZoneContent', function(response) {
      callbackManager(response, function (relTimeline) {
          backendSocket.emit('RetrieveCompleteRelativeTimeline', {'timelineId' : $scope.timelineId});
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateRelativeTimeline', function(response) {
      callbackManager(response, function (relTimeline) {
          $scope.timelineId = relTimeline.id;
          saveAttribute("UpdateZoneContent", $scope.zoneContentId, "linkRelativeTimeline", $scope.timelineId);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerUpdateZone', function(response) {
      callbackManager(response, function (zone) {
          backendSocket.emit('CreateRelativeTimeline', {"name" : "New"});
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateZoneContent', function(response) {
      callbackManager(response, function (zoneContent) {
          $scope.zoneContentId = zoneContent.id;
          saveAttribute("UpdateZone", $scope.zoneId, "addZoneContent", zoneContent.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit('CreateZoneContent', {"name" : "New", "description" : "New"});




  }]);
