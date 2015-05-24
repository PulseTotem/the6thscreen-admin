'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditRelativeTimelineCtrl
 * @description
 * # AddEditRelativeTimelineCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddEditRelativeTimelineCtrl', ['$scope', 'backendSocket', 'callbackManager', function ($scope, backendSocket, callbackManager) {

    $scope.zone = {};
    $scope.showServiceId = -1;
    $scope.timelineDuration = 0;

    backendSocket.on('CallTypesDescriptionFromZone', function (response) {
      callbackManager(response, function (infoCT) {
        $scope.zone = infoCT;
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.emit('RetrieveCallTypesFromZoneIdComplete', {'zoneId': $scope.zoneId});

    var calculTimelineDuration = function() {
      if(typeof($scope.timeline.id) != "undefined") {
        $scope.timeline.relativeEvents.forEach(function (relEvent) {
          $scope.timelineDuration += relEvent.duration;
        });
      }
    };

    if(typeof($scope.timeline) != "undefined" && typeof($scope.timeline.id) != "undefined") {
      calculTimelineDuration();
    } else {
      $scope.$watch(function () {
        return $scope.timeline;
      }, calculTimelineDuration, true);
    }

    $scope.updateShowServiceId = function(serviceId) {
      $scope.showServiceId = serviceId;
    };
}]);
