'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditCallCtrl
 * @description
 * # AddEditCallCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddEditCallCtrl', ['$scope', 'backendSocket', 'callbackManager', 'saveAttribute', function ($scope, backendSocket, callbackManager, saveAttribute) {
    $scope.callType = null;
    $scope.callDesc = null;
    $scope.paramValues = [];

    //Manage retrieve CallType description and Call description
    backendSocket.on('CompleteCallTypeDescription', function(response) {
      callbackManager(response, function (cTInfo) {
          $scope.callType = cTInfo;
          manageParamValues();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('CompleteCallDescription', function(response) {
      callbackManager(response, function (cInfo) {
          $scope.callDesc = cInfo;
          manageParamValues();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.$watch(function () {
      return $scope.call;
    }, function() {
      $scope.callType = null;
      $scope.callDesc = null;
      $scope.paramValues = [];

      if(typeof($scope.event.name) != "undefined") {
        $scope.eventName = $scope.event.name;
      }

      if(typeof($scope.call.callType) != "undefined" && $scope.call.callType.id != -1) {
        backendSocket.emit('RetrieveCompleteCallType', {'callTypeId': $scope.call.callType.id});
      }

      if(typeof($scope.call) != "undefined" && $scope.call.id != -1) {
        backendSocket.emit('RetrieveCompleteCall', {'callId': $scope.call.id});
      }
    }, true);


    //Managing EventName and CallName updates.
    backendSocket.on('AnswerUpdateRelativeEvent', function (response) {
      callbackManager(response, function (relEvent) {
          $scope.refreshRelativeTimeline();
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.$watch(function () {
      return $scope.eventName;
    }, function() {
      if(typeof($scope.event.id) != "undefined" && $scope.event.id != -1) {
        saveAttribute("UpdateRelativeEvent", $scope.event.id, "setName", $scope.eventName);
      }

      if(typeof($scope.call.id) != "undefined" && $scope.call.id != -1) {
        backendSocket.on('AnswerUpdateCall', function (response) {
          callbackManager(response, function (call) {
              //OK! : Nothing to do
            },
            function (fail) {
              console.error(fail);
            }
          );
        });

        saveAttribute("UpdateCall", $scope.call.id, "setName", $scope.eventName);
      }
    }, true);


    //Managing Call's ParamValues
    var manageParamValues = function() {
      if($scope.callType != null && $scope.callDesc != null) {

        if($scope.callType.source.paramTypes.length == $scope.callDesc.paramValues.length) {
          $scope.paramValues = [];
          var paramValuesIndex = 2;

          $scope.callType.source.paramTypes.forEach(function(paramType) {
            var pv = retrieveParamValue(paramType.id);

            if(pv == null) {
              console.log("Error ! A CallType has not ParamValue");
            } else {
              if(paramType.name == "InfoDuration") {
                $scope.paramValues[0] = pv;
              } else if(paramType.name == "Limit") {
                $scope.paramValues[1] = pv;
              } else {
                $scope.paramValues[paramValuesIndex] = pv;
                paramValuesIndex++;
              }
            }
          });
        } else {

          var numberOfNewPV = $scope.callType.source.paramTypes.length - $scope.callDesc.paramValues.length;

          var newParamValues = [];

          backendSocket.on('AnswerUpdateCall', function (response) {
            callbackManager(response, function (call) {
                if(newParamValues.length == numberOfNewPV) {
                  backendSocket.emit('RetrieveCompleteCall', {'callId': $scope.call.id});
                }
              },
              function (fail) {
                console.error(fail);
              }
            );
          });

          backendSocket.on('AnswerCreateEmptyParamValueForParamTypeId', function(response) {
            callbackManager(response, function (newParamValue) {
                newParamValues.push(newParamValue);
                saveAttribute("UpdateCall", $scope.call.id, "addParamValue", newParamValue.id);
              },
              function (fail) {
                console.error(fail);
              }
            );
          });

          $scope.callType.source.paramTypes.forEach(function(paramType) {
            var pv = retrieveParamValue(paramType.id);

            if(pv == null) {
              backendSocket.emit("CreateEmptyParamValueForParamTypeId", {"paramTypeId" : paramType.id});
            }
          });
        }
      }
    };

    var retrieveParamValue = function(paramTypeId) {
      if($scope.callDesc.paramValues.length > 0) {
        for(var iPV in $scope.callDesc.paramValues) {
          var pv = $scope.callDesc.paramValues[iPV];
          if(pv.paramType.id == paramTypeId) {
            return pv;
          }
        }
        return null;
      } else {
        return null;
      }
    };
  }]);
