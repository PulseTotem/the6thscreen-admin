'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowZoneCtrl', ['$scope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {

    $scope.zoneID = $routeParams.zoneId;
    $scope.sdiId = $routeParams.sdiId;
    $scope.zone = {};
    $scope.relativeTimelines = [];
    $scope.absoluteTimelines = [];

    backendSocket.on('CompleteRelativeTimelineDescription', function(response) {
      callbackManager(response, function (timelineInfo) {

          var timelineDuration = 0;
          timelineInfo.relativeEvents.forEach(function(relEvent) {
            timelineDuration += relEvent.duration;
          });
          timelineInfo["duration"] = timelineDuration;

          $scope.relativeTimelines.push(timelineInfo);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('ZoneContentDescription', function(response) {
      callbackManager(response, function (zoneContentInfo) {
          if(zoneContentInfo.absoluteTimeline != null) {
            //TODO
          } else if(zoneContentInfo.relativeTimeline != null) {
            backendSocket.emit('RetrieveCompleteRelativeTimeline', {'timelineId' : zoneContentInfo.relativeTimeline.id});
          }
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('ZoneDescription', function(response) {
        callbackManager(response, function (zoneInfo) {
                $scope.zone = zoneInfo;

                $scope.zone.zoneContents.forEach(function(zc) {
                  backendSocket.emit('RetrieveZoneContentDescription', {'zoneContentId' : zc.id});
                });
            },
            function (fail) {
                console.error(fail);
            }
        );

    });

    backendSocket.emit('RetrieveZoneDescription', {'zoneId' : $scope.zoneID});

  }]);
