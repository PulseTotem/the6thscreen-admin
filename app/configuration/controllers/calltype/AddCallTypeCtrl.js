'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddCallTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {
    $scope.sources = [];
    $scope.renderers = [];
    $scope.policies = [];
    $scope.callType = null;
    $scope.isFirstStep = true;
    $scope.isSecondStep = false;
    $scope.isFinalStep = false;

    backendSocket.on('AllPolicyDescription', function(response) {
      callbackManager(response, function (policies) {
          $scope.policies = policies;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('SourcesDescriptionFromService', function(response) {
      callbackManager(response, function (sources) {
          $scope.sources = sources;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('RenderersDescriptionFromSource', function(response) {
      callbackManager(response, function (renderers) {
          $scope.renderers = renderers;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerUpdateCallType', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;

          if (callType.source) {
            backendSocket.emit("RetrieveRenderersFromSourceId", {"sourceId": callType.source});
            $scope.isSecondStep = true;
          }
          if (callType.renderer) {
            backendSocket.emit("RetrieveAllPolicyDescription");
            $scope.isFinalStep = true;
          }
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerCreateCallType', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;
          saveAttribute("UpdateCallType", $scope.callType.id, "linkZone", $scope.current_zone.id);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.emit("RetrieveSourcesFromServiceId", {"serviceId": $scope.current_service.id});
    backendSocket.emit("CreateCallType", {});

    $scope.selectSource = function (sourceId) {
      saveAttribute("UpdateCallType", $scope.callType.id, "linkSource", sourceId);

    };

    $scope.selectRenderer = function (rendererId) {
      saveAttribute("UpdateCallType", $scope.callType.id, "linkRenderer", rendererId);
    };

    $scope.saveName = function () {
      saveAttribute("UpdateCallType", $scope.callType.id, "setName", $scope.callType.name);
    };

    $scope.selectPolicy = function (policyId) {
      saveAttribute("UpdateCallType", $scope.callType.id, "linkPolicy", policyId);
    };

    $scope.destroyCallType = function () {
      if ($scope.callType.id) {
        backendSocket.emit("DeleteCallType", {"callTypeId": $scope.callType.id});
      }
      $scope.$dismiss('cancel');
    };

    $scope.close = function () {
      $scope.$close($scope.callType);
    };
  }]);
