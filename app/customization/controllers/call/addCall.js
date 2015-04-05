'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddzoneCtrl
 * @description
 * # AddzoneCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SCustomization')
  .controller('T6SCustomization.AddCallCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', function ($scope, $routeParams, backendSocket, callbackManager) {
    backendSocket.userIsLogin(function() {
      $scope.callTypeId = $routeParams.callTypeId;
      $scope.call = {};
      $scope.listParamType = [];
      $scope.value = {};
      $scope.mapIdParamIdValue = {};

      backendSocket.on('CallDescription', function(response) {
        callbackManager(response, function (call) {
            $scope.call = call;
            linkCallType();
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

      backendSocket.emit('RetrieveParamTypesFromCallType', {'callTypeId': $scope.callTypeId});
    });

    var linkCallType = function () {
      if (!$scope.call.callType) {
        $scope.saveAttribute("linkCallType", $scope.callTypeId);
      }
    };

    $scope.saveAttribute = function (element, value) {
      if (!$scope.call.id) {
        backendSocket.emit('CreateCallDescription', $scope.call);
      } else {
        var data = { "id" : $scope.call.id, "method": element, "value": value };
        backendSocket.emit("UpdateCallDescription", data);
      }
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
