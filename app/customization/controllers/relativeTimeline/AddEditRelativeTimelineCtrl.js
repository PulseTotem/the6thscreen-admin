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
      console.log("Drop index :"+index);
      console.log("Drop data position: "+data.position);

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

    /**
     * If oldIndex = -1, it is a new element: all indexes > newIndex are moved +1 position
     * If newIndex = -1, it is a deleted element: all indexes > oldIndex are moved -1 position
     * If oldIndex and newIndex are different from -1, the minimum between the two is taken and elements are moved accordingly between them
     * @param oldIndex
     * @param newIndex
       */
    var updateRelativeEventsPositions = function(oldIndex, newIndex) {

      var updatePosition = function (oldIndex, newIndex) {
        var updatesToDo = [];

        var addition = false;
        if (oldIndex > newIndex) {
          addition = true;
        }

        for (var i = 0; i < $scope.timeline.relativeEvents.length; i++) {
          var relEvent = $scope.timeline.relativeEvents[i];

          if (newIndex != -1 && oldIndex == -1 && relEvent.position > newIndex) {
            updatesToDo.push({'id':relEvent.id, 'position':relEvent.position+1});
          } else if (oldIndex != -1 && newIndex == -1 && relEvent.position > oldIndex) {
            updatesToDo.push({'id':relEvent.id, 'position':relEvent.position-1});
          } else {
            if (relEvent.position == oldIndex && addition) {
              updatesToDo.push({'id': relEvent.id, 'position': newIndex});
            } else if (relEvent.position == oldIndex && !addition) {
              updatesToDo.push({'id': relEvent.id, 'position': newIndex-1});
            } else if (addition && relEvent.position >= newIndex && relEvent.position < oldIndex) {
              updatesToDo.push({'id':relEvent.id, 'position':relEvent.position+1});
            } else if (!addition && relEvent.position > oldIndex && relEvent.position < newIndex) {
              updatesToDo.push({'id':relEvent.id, 'position':relEvent.position-1});
            }
          }
        }

        if (updatesToDo.length > 0) {
          var nbUpdates = 0;
          backendSocket.on('AnswerUpdateRelativeEvent', function(response) {
            callbackManager(response, function (relEvent) {
                nbUpdates++;

                if(nbUpdates >= updatesToDo.length-1) {
                  $scope.refreshRelativeTimeline();
                }
              },
              function (fail) {
                console.error(fail);
              }
            );
          });

          for (var i = 0; i < updatesToDo.length; i++) {
            var updateToDo = updatesToDo[i];
            saveAttribute("UpdateRelativeEvent", updateToDo.id, "setPosition", updateToDo.position);
          }

        }
      };

      // This only fix position to avoid gap between events: if position are 1, 3, 8, 10, then it will become 1,2,3,4,5
      var fixPosition = function () {
        var updatesToDo = [];

        for (var i = 0; i < $scope.timeline.relativeEvents.length; i++) {
          var relEvent = $scope.timeline.relativeEvents[i];

          if (relEvent.position != i) {
            updatesToDo.push({'id':relEvent.id, 'position':i});
            relEvent.position = i;

            if (relEvent.position == oldIndex) {
              oldIndex = i;
            }

            if (relEvent.position == newIndex) {
              newIndex = i;
            }
          }
        }

        if (updatesToDo.length > 0) {
          var nbUpdates = 0;
          backendSocket.on('AnswerUpdateRelativeEvent', function(response) {
            callbackManager(response, function (relEvent) {
                nbUpdates++;

                if(nbUpdates >= updatesToDo.length-1) {
                  updatePosition(oldIndex, newIndex);
                }
              },
              function (fail) {
                console.error(fail);
              }
            );
          });

          for (var i = 0; i < updatesToDo.length; i++) {
            var updateToDo = updatesToDo[i];
            saveAttribute("UpdateRelativeEvent", updateToDo.id, "setPosition", updateToDo.position);
          }
        } else {
          updatePosition(oldIndex, newIndex);
        }
      };

      fixPosition();
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

    backendSocket.on('AnswerCloneRelativeEventAndLinkTimeline', function(response) {
      callbackManager(response, function (relEventId) {
          backendSocket.on('AnswerUpdateRelativeEvent', function(response) {
            callbackManager(response, function (relEvent) {
                $scope.refreshRelativeTimeline();
              },
              function (fail) {
                console.error(fail);
                $scope.refreshRelativeTimeline();
              }
            );
          });

          var maxPos = 0;
          for (var i = 0; i < $scope.timeline.relativeEvents.length; i++) {
            var event = $scope.timeline.relativeEvents[i];
            if (event.position > maxPos) {
              maxPos = event.position;
            }
          }

          saveAttribute("UpdateRelativeEvent", relEventId.cloneId, "setPosition", maxPos+1);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.cloneEvent = function(event) {
      backendSocket.emit("CloneRelativeEventAndLinkTimeline", {'relativeEventId': event.id, 'timelineId' : $scope.timelineId});
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

    $scope.saveTimelineRunner = function(runner) {
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

    $scope.saveSystemTrigger = function(trigger) {
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

    $scope.saveUserTrigger = function(trigger) {
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
