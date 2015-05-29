'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditRelativeTimelineCtrl
 * @description
 * # AddEditRelativeTimelineCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddEditRelativeTimelineCtrl', ['$scope', 'backendSocket', 'callbackManager', 'saveAttribute', function ($scope, backendSocket, callbackManager, saveAttribute) {

    $scope.zone = {};
    $scope.showServiceId = -1;
    $scope.timelineDuration = 0;
    $scope.events = [];
    $scope.callTypes = [];
    $scope.neutralCall = {
      "id" : -1,
      "callType" : {
        "id" : -1
      }
    };
    $scope.call = $scope.neutralCall;
    $scope.hovercall = $scope.neutralCall;
    $scope.event = {};
    $scope.neutralEventDuration = {
      "id" : -1,
      "paramType" : {
        "name" : "EventDuration",
        "type" : {
          "name" : "Duration"
        }
      },
      "value" : ""
    };
    $scope.eventDuration = $scope.neutralEventDuration;
    $scope.neutralTrigger = {
      "id" : -1
    };
    $scope.timelineRunner = $scope.neutralTrigger;
    $scope.systemTrigger = $scope.neutralTrigger;
    $scope.userTrigger = $scope.neutralTrigger;

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

    backendSocket.on('CallTypesDescriptionFromZone', function (response) {
      callbackManager(response, function (infoCT) {
        $scope.zone = infoCT;
        $scope.zone.services.forEach(function(service) {
          service.callTypes.forEach(function(callType) {
            $scope.callTypes[callType.id] = service;
          });
        });
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.emit('RetrieveCallTypesFromZoneId', {'zoneId': $scope.zoneId});

    backendSocket.on('AllTimelineRunnerDescription', function (response) {
      callbackManager(response, function (allTimelineRunners) {
        $scope.timelineRunners = allTimelineRunners;
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.emit('RetrieveAllTimelineRunnerDescription');

    backendSocket.on('AllSystemTriggerDescription', function (response) {
      callbackManager(response, function (allSystemTriggers) {
        $scope.systemTriggers = allSystemTriggers;
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.emit('RetrieveAllSystemTriggerDescription');

    backendSocket.on('AllUserTriggerDescription', function (response) {
      callbackManager(response, function (allUserTriggers) {
        $scope.userTriggers = allUserTriggers;
      }, function (fail) {
        console.error(fail);
      });
    });

    backendSocket.emit('RetrieveAllUserTriggerDescription');


    var calculTimelineDuration = function() {
      if(typeof($scope.timeline.id) != "undefined") {
        $scope.events = [];
        $scope.timelineDuration = 0;

        $scope.timeline.relativeEvents.forEach(function (relEvent) {
          $scope.timelineDuration += relEvent.duration;

          var relEventEndDate = moment($scope.timelineDuration*1000);

          var endDateString = relEventEndDate.utc().format("HH[h] mm[m] ss[s]");

          $scope.events[relEvent.id] = endDateString;
        });
      }
    };

    var updateTimelineTriggers = function() {
      $scope.timelineRunner = $scope.neutralTrigger;
      $scope.systemTrigger = $scope.neutralTrigger;
      $scope.userTrigger = $scope.neutralTrigger;

      if(typeof($scope.timeline.id) != "undefined") {
        if(typeof($scope.timeline.timelineRunner) != "undefined" && $scope.timeline.timelineRunner != null) {
          $scope.timelineRunner = $scope.timeline.timelineRunner;
        }

        if(typeof($scope.timeline.systemTrigger) != "undefined" && $scope.timeline.systemTrigger != null) {
          $scope.systemTrigger = $scope.timeline.systemTrigger;
        }

        if(typeof($scope.timeline.userTrigger) != "undefined" && $scope.timeline.userTrigger != null) {
          $scope.userTrigger = $scope.timeline.userTrigger;
        }
      }
    };

    var manageTimelineChanged = function() {
      calculTimelineDuration();
      updateTimelineTriggers();
    }

    if(typeof($scope.timeline) != "undefined" && typeof($scope.timeline.id) != "undefined") {
      manageTimelineChanged();
    } else {
      $scope.$watch(function () {
        return $scope.timeline;
      }, manageTimelineChanged, true);
    }

    $scope.$watch(function () {
      return $scope.timelineName;
    }, function() {
      if(typeof($scope.timeline.id) != "undefined") {
        backendSocket.on('AnswerUpdateRelativeTimeline', function (response) {
          callbackManager(response, function (relTimeline) {
              //OK! : Nothing to do
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateRelativeTimeline", $scope.timeline.id, "setName", $scope.timelineName);
      }
    }, true);

    $scope.updateShowServiceId = function(serviceId) {
      $scope.showServiceId = serviceId;
    };

    $scope.onDragComplete = function(data, evt){
      var relEvent = {};
      relEvent.name = "New";
      relEvent.position = -1;
      relEvent.duration = 300;
      relEvent.call = {};
      relEvent.call.name = "New";
      relEvent.call.callType = data;
      evt.data = relEvent;
    }

    $scope.onDropComplete = function(index, data, evt){
      if(data.position == -1) {
        if(index == -1) {
          data.position = 0;
        } else {
          data.position = index;
        }

        var newCall = null;
        var newRelEvent = null;

        backendSocket.on('AnswerUpdateRelativeTimeline', function(response) {
          callbackManager(response, function (relTimeline) {
              if(index == -1) {
                $scope.refreshRelativeTimeline();
              } else {
                updateRelativeEventsPositions(-1, index);
              }
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.on('AnswerUpdateRelativeEvent', function(response) {
          callbackManager(response, function (relEvent) {
              newRelEvent = relEvent;
              saveAttribute("UpdateRelativeTimeline", $scope.timeline.id, "addRelativeEvent", newRelEvent.id);
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.on('AnswerCreateRelativeEvent', function(response) {
          callbackManager(response, function (relEvent) {
              newRelEvent = relEvent;
              saveAttribute("UpdateRelativeEvent", relEvent.id, "linkCall", newCall.id);
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.on('AnswerUpdateCall', function(response) {
          callbackManager(response, function (call) {
              newCall = call;
              backendSocket.emit('CreateRelativeEvent', data);
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.on('AnswerCreateCall', function(response) {
          callbackManager(response, function (call) {
              newCall = call;
              saveAttribute("UpdateCall", newCall.id, "linkCallType", data.call.callType.id);
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        backendSocket.emit('CreateCall', data.call);
      } else {
        updateRelativeEventsPositions(data.position, index);
      }
    };

    var updateRelativeEventsPositions = function(oldIndex, newIndex) {
      var nbUpdates = 0;

      if(oldIndex != -1) {
        if (oldIndex > newIndex) {
          nbUpdates = (oldIndex - newIndex) + 1;
        } else {
          nbUpdates = (newIndex - oldIndex) + 1;
        }
      } else {
          nbUpdates = $scope.timeline.relativeEvents.length - newIndex;
      }

      var newEvents = [];

      backendSocket.on('AnswerUpdateRelativeEvent', function(response) {
        callbackManager(response, function (relEvent) {
            newEvents.push(relEvent);

            if(newEvents.length == nbUpdates) {
              $scope.refreshRelativeTimeline();
            }
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      $scope.timeline.relativeEvents.forEach(function(relEvent) {

        if(oldIndex != -1) {
          if (newIndex < oldIndex && newIndex <= relEvent.position && relEvent.position < oldIndex) {
            saveAttribute("UpdateRelativeEvent", relEvent.id, "setPosition", relEvent.position + 1);
          }

          if (oldIndex < newIndex && oldIndex < relEvent.position && relEvent.position <= newIndex) {
            saveAttribute("UpdateRelativeEvent", relEvent.id, "setPosition", relEvent.position - 1);
          }

          if(relEvent.position == oldIndex) {
            saveAttribute("UpdateRelativeEvent", relEvent.id, "setPosition", newIndex);
          }
        } else {
          if (relEvent.position >= newIndex) {
            saveAttribute("UpdateRelativeEvent", relEvent.id, "setPosition", relEvent.position + 1);
          }
        }

      });
    };

    $scope.refreshRelativeTimeline = function() {
      backendSocket.emit('RetrieveCompleteRelativeTimeline', {'timelineId' : $scope.timelineId});
    };

    $scope.updateEvent = function(event) {
      if(event != null) {
        $scope.event = event;
        var newEventDuration = $scope.neutralEventDuration;
        newEventDuration.id = $scope.event.id;
        newEventDuration.value = $scope.event.duration.toString();
        $scope.eventDuration = newEventDuration;

        $scope.call = event.call;
      } else {
        $scope.call = $scope.neutralCall;
        $scope.hovercall = $scope.neutralCall;
        $scope.event = {};
        $scope.eventDuration = $scope.neutralEventDuration;
      }
    };

    backendSocket.on('AnswerDeleteRelativeEvent', function(response) {
      callbackManager(response, function (relEventId) {
          $scope.refreshRelativeTimeline();
          $scope.updateEvent(null);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.deleteEvent = function(event) {
      backendSocket.emit('DeleteRelativeEvent', {'relativeEventId' : event.id});
    };

    $scope.saveEventDuration = function(id, newValue) {
      if(typeof(id) != "undefined" && id != -1) {
        backendSocket.on('AnswerUpdateRelativeEvent', function(response) {
          callbackManager(response, function (relEvent) {
              $scope.refreshRelativeTimeline();
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateRelativeEvent", id, "setDuration", parseInt(newValue));
      }
    };

    $scope.updateHoverCall = function(call) {
      $scope.hovercall = call;
    };

    $scope.resetHoverCall = function() {
      $scope.hovercall = $scope.neutralCall;
    };

    $scope.updateTimelineRunner = function(runner) {
      if (typeof($scope.timeline.id) != "undefined") {
        backendSocket.on('AnswerUpdateRelativeTimeline', function (response) {
          callbackManager(response, function (relTimeline) {
              $scope.timelineRunner = runner;
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateRelativeTimeline", $scope.timeline.id, "linkTimelineRunner", runner.id);
      }
    };

    $scope.updateSystemTrigger = function(trigger) {
      if (typeof($scope.timeline.id) != "undefined") {
        backendSocket.on('AnswerUpdateRelativeTimeline', function (response) {
          callbackManager(response, function (relTimeline) {
              $scope.systemTrigger = trigger;
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateRelativeTimeline", $scope.timeline.id, "linkSystemTrigger", trigger.id);
      }
    };

    $scope.updateUserTrigger = function(trigger) {
      if (typeof($scope.timeline.id) != "undefined") {
        backendSocket.on('AnswerUpdateRelativeTimeline', function (response) {
          callbackManager(response, function (relTimeline) {
              $scope.userTrigger = trigger;
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateRelativeTimeline", $scope.timeline.id, "linkUserTrigger", trigger.id);
      }
    };

}]);
