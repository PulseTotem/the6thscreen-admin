'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddzoneCtrl
 * @description
 * # AddzoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.EditCallCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.callTypeId = $routeParams.callTypeId;
      $scope.call = {};
      $scope.call.id = $routeParams.callId;
      $scope.listParamType = [];
      $scope.value = {};
      $scope.mapIdParamIdValue = {};

      backendSocket.on('CallDescription', function(response) {
        callbackManager(response, function (call) {
            $scope.call = call;
          },
          function (fail) {
            console.error(fail);
          }
        );
      });

      backendSocket.on('ParamTypesDescription', function (response) {
        callbackManager(response, function(paramType) {
          $scope.listParamType.push(paramType);
        })
      });

      backendSocket.on('ParamValueCreationDescription', function (response) {
        callbackManager(response, function(data) {
          $scope.mapIdParamIdValue[data.paramTypeId] = data.paramValueId;
          $scope.saveAttribute("addParamValue", data.paramValueId);
        })
      });

      backendSocket.on('ParamValuesDescription', function(response) {
        callbackManager(response, function (paramValue) {
            $scope.mapIdParamIdValue[paramValue.paramType.id] = paramValue.id;
            $scope.value[paramValue.paramType.id] = paramValue.value;
          },
          function (fail) {
            console.error(fail);
          }
        );

      });

      backendSocket.emit('RetrieveCallDescription', {'callId': $scope.call.id});
      backendSocket.emit('RetrieveParamTypesFromCallType', {'callTypeId': $scope.callTypeId});
      backendSocket.emit('RetrieveParamValuesFromCall', {'callId': $scope.call.id});
    });

    $scope.saveAttribute = function (element, value) {
      var data = { "id" : $scope.call.id, "method": element, "value": value };
      backendSocket.emit("UpdateCallDescription", data);
    };

    $scope.saveParamValue = function (idParam) {
      if (!$scope.mapIdParamIdValue[idParam]) {
        var data = { "paramTypeId": idParam, "paramValue": $scope.value[idParam]};
        backendSocket.emit('CreateParamValueDescription', data);
      } else {
        var data = {"id": $scope.mapIdParamIdValue[idParam], "method": "setValue", "value": $scope.value[idParam]};
        backendSocket.emit("UpdateParamValueDescription", data);
      }
      console.log("Id Param : "+idParam);
      console.log($scope.value);
    };
  }]);
