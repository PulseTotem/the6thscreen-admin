'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddEditCallCtrl
 * @description
 * # AddEditCallCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddEditCallCtrl', ['$rootScope', '$scope', 'backendSocket', 'callbackManager', 'saveAttribute', function ($rootScope, $scope, backendSocket, callbackManager, saveAttribute) {
    $scope.callType = null;
    $scope.callDesc = null;
    $scope.infoDurationParamValue = null;
    $scope.limitParamValue = null;
    $scope.paramValues = [];
    $scope.advancedParamValues = [];
    $scope.needsOauth = false;
    $scope.oauthkeys = [];

    //Manage retrieve CallType description and Call description
    backendSocket.on('OAuthKeysFromServiceAndUser', function(response) {
      callbackManager(response, function (oauthkeysList) {
          $scope.oauthkeys = oauthkeysList;

          if($scope.oauthkeys.length > 0) {
            var firstOAuthKey = $scope.oauthkeys[0];

            backendSocket.on('AnswerUpdateCall', function (response) {
              callbackManager(response, function (call) {
                  $scope.needsOauth = true;
                  manageParamValues();
                },
                function (fail) {
                  console.error(fail);
                }
              );
            });

            saveAttribute("UpdateCall", $scope.call.id, "linkOAuthKey", firstOAuthKey.id);
          } else {
            $scope.needsOauth = true;
            manageParamValues();
          }
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('CompleteCallTypeDescription', function(response) {
      callbackManager(response, function (cTInfo) {
          $scope.callType = cTInfo;

          if($scope.callType.source.service.oauth) {
            if($scope.callDesc.oAuthKey == null) {
              backendSocket.emit('RetrieveOAuthKeysFromServiceAndUser', {'userId': $rootScope.user.id, 'serviceId': $scope.callType.source.service.id});
            } else {
              $scope.needsOauth = false;
              manageParamValues();
            }
          } else {
            manageParamValues();
          }
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('CompleteCallDescription', function(response) {
      callbackManager(response, function (cInfo) {
          $scope.callDesc = cInfo;

          if($scope.callType == null && typeof($scope.call.callType) != "undefined" && $scope.call.callType.id != -1) {
            backendSocket.emit('RetrieveCompleteCallType', {'callTypeId': $scope.call.callType.id});
          } else {
            manageParamValues();
          }
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
      $scope.infoDurationParamValue = null;
      $scope.limitParamValue = null;
      $scope.paramValues = [];
      $scope.advancedParamValues = [];
      $scope.needsOauth = false;
      $scope.oauthkeys = [];

      if(typeof($scope.event.name) != "undefined") {
        $scope.eventName = $scope.event.name;
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

        $scope.infoDurationParamValue = null;
        $scope.limitParamValue = null;
        $scope.paramValues = [];
        $scope.advancedParamValues = [];

        if(($scope.callType.source.paramTypes.length - $scope.callType.source.paramValues.length) == $scope.callDesc.paramValues.length) {

          $scope.callType.source.paramTypes.forEach(function(paramType) {
            var pv = retrieveParamValue(paramType.id);

            if(pv == null) {
              console.log("Error ! A CallType has not ParamValue");
            } else {
              pv["paramType"] = paramType;

              if(paramType.name == "InfoDuration") {
                $scope.infoDurationParamValue = pv;
              } else if(paramType.name == "Limit") {
                $scope.limitParamValue = pv;
              } else {
                if(paramType.defaultValue != null) {
                  $scope.advancedParamValues.push(pv);
                } else {
                  $scope.paramValues.push(pv);
                }
              }
            }
          });

        } else {

          var numberOfNewPV = $scope.callType.source.paramTypes.length - $scope.callType.source.paramValues.length - $scope.callDesc.paramValues.length;

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
              pv = retrieveDefaultParamValue(paramType.id);

              if(pv == null) {
                backendSocket.emit("CreateEmptyParamValueForParamTypeId", {"paramTypeId": paramType.id});
              }
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

    var retrieveDefaultParamValue = function(paramTypeId) {
      if($scope.callType.source.paramValues.length > 0) {
        for(var iPV in $scope.callType.source.paramValues) {
          var pv = $scope.callType.source.paramValues[iPV];
          if(pv.paramType.id == paramTypeId) {
            return pv;
          }
        }
        return null;
      } else {
        return null;
      }
    };


    $scope.saveParamValue = function(id, newValue) {
      saveAttribute("UpdateParamValue", id, "setValue", newValue);
    };
  }]);
