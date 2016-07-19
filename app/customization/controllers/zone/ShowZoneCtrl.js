'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:ZoneCtrl
 * @description
 * # ZoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.ShowZoneCtrl', ['$scope', '$rootScope', '$routeParams', 'backendSocket', 'callbackManager', function ($scope, $rootScope, $routeParams, backendSocket, callbackManager) {

    $scope.zoneId = $routeParams.zoneId;
    $scope.sdiId = $routeParams.sdiId;
    $rootScope.currentZone = $scope.zoneId;
    $scope.zone = {};
    $scope.relativeTimelines = [];
    $scope.absoluteTimelines = [];
    $scope.zoneContentForRelativeTimeline = {};
    $scope.zoneContentForAbsoluteTimeline = {};

    backendSocket.on('CompleteAbsoluteTimelineDescription', function(response) {
      callbackManager(response, function (absTimelineInfo) {

          var absoluteEvents = absTimelineInfo.absoluteEvents;

          absTimelineInfo.absoluteEvents = [];

          absoluteEvents.forEach(function(absEvent) {

            var timelineDuration = 0;
            absEvent.relativeTimeline.relativeEvents.forEach(function(relEvent) {
              timelineDuration += relEvent.duration;
            });
            absEvent.relativeTimeline["duration"] = timelineDuration;

            var td = moment(timelineDuration*1000);

            absEvent.relativeTimeline["durationString"] = td.utc().format("HH[h] mm[m] ss[s]");

            absTimelineInfo.absoluteEvents.push(absEvent);

          });

          $scope.absoluteTimelines.push(absTimelineInfo);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('CompleteRelativeTimelineDescription', function(response) {
      callbackManager(response, function (timelineInfo) {

          var timelineDuration = 0;
          timelineInfo.relativeEvents.forEach(function(relEvent) {
            timelineDuration += relEvent.duration;
          });
          timelineInfo["duration"] = timelineDuration;

          var td = moment(timelineDuration*1000);

          timelineInfo["durationString"] = td.utc().format("HH[h] mm[m] ss[s]");

          var dCreatedAt = moment(timelineInfo.createdAt);
          timelineInfo["createdAtString"] = dCreatedAt.format("DD/MM/YYYY HH:mm:ss");

          var dUpdatedAt = moment(timelineInfo.updatedAt);
          timelineInfo["updatedAtString"] = dUpdatedAt.format("DD/MM/YYYY HH:mm:ss");

          $scope.relativeTimelines.push(timelineInfo);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('ZoneContentDescription', function(response) {
      callbackManager(response, function (zoneContentInfo) {
          insertInZoneDescription(zoneContentInfo);
          if(zoneContentInfo.absoluteTimeline != null) {
            $scope.zoneContentForAbsoluteTimeline[zoneContentInfo.absoluteTimeline.id] = zoneContentInfo.id;
            backendSocket.emit('RetrieveCompleteAbsoluteTimeline', {'timelineId' : zoneContentInfo.absoluteTimeline.id});
          } else if(zoneContentInfo.relativeTimeline != null) {
            $scope.zoneContentForRelativeTimeline[zoneContentInfo.relativeTimeline.id] = zoneContentInfo.id;
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
                $scope.relativeTimelines = [];
                $scope.absoluteTimelines = [];

                $scope.zone.zoneContents.forEach(function(zc) {
                  backendSocket.emit('RetrieveZoneContentDescription', {'zoneContentId' : zc.id});
                });
            },
            function (fail) {
                console.error(fail);
            }
        );

    });

    backendSocket.emit('RetrieveZoneDescription', {'zoneId' : $scope.zoneId});

    var insertInZoneDescription = function(zoneContentInfo) {
      for(var iZoneContent in $scope.zone.zoneContents) {
        var zc = $scope.zone.zoneContents[iZoneContent];
        if(zc.id == zoneContentInfo.id) {
          $scope.zone.zoneContents[iZoneContent] = zoneContentInfo;
        }
      }
    };

  }]);
