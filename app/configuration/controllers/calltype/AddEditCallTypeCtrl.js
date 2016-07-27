'use strict';

/**
 * @ngdoc function
 * @name the6thscreenAdminApp.controller:AddcalltypeCtrl
 * @description
 * # AddcalltypeCtrl
 * Controller of the the6thscreenAdminApp
 */
angular.module('T6SConfiguration')
  .controller('T6SConfiguration.AddEditCallTypeCtrl', ['$scope','$routeParams','backendSocket', 'callbackManager', 'saveAttribute', function ($scope, $routeParams, backendSocket, callbackManager, saveAttribute) {
    $scope.sources = [];
    $scope.renderers = [];
    $scope.rendererThemes = [];
    $scope.policies = [];
    //$scope.callType = {};
    $scope.isFirstStep = true;
    $scope.isSecondStep = false;
    $scope.isThirdStep = false;
    $scope.isFinalStep = false;

    backendSocket.emit("RetrieveSourcesFromServiceId", {"serviceId": $scope.current_service.id});

    $scope.refreshCallType = function (callType) {
      $scope.callType.complete = callType.complete;
      if ($scope.callType.source) {
        backendSocket.emit("RetrieveRenderersFromSourceId", {"sourceId": $scope.callType.source.id});
        $scope.isSecondStep = true;
      }
      if($scope.callType.renderer) {
        backendSocket.emit("RetrieveRendererThemesFromRendererId", {"rendererId": $scope.callType.renderer.id});
        $scope.isThirdStep = true;
      }
      if ($scope.callType.rendererTheme) {
        backendSocket.emit("RetrieveAllPolicyDescription");
        $scope.isFinalStep = true;
      }
    };

    backendSocket.on('CallTypeDescription', function(response) {
      callbackManager(response, function (callType) {
          $scope.callType = callType;
          $scope.refreshCallType(callType);
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

    backendSocket.on('AllPolicyDescription', function(response) {
      callbackManager(response, function (policies) {
          $scope.policies = policies;
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

    backendSocket.on('RendererThemesDescriptionFromRenderer', function(response) {
      callbackManager(response, function (rendererThemes) {
          $scope.rendererThemes = rendererThemes;
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    backendSocket.on('AnswerUpdateCallType', function(response) {
      callbackManager(response, function (callType) {
          $scope.refreshCallType(callType);
        },
        function (fail) {
          console.error(fail);
        }
      );
    });

    $scope.selectSource = function (source) {
      $scope.callType.source = source;
      saveAttribute("UpdateCallType", $scope.callType.id, "linkSource", source.id);
    };

    $scope.selectRenderer = function (renderer) {
      $scope.callType.renderer = renderer;
      saveAttribute("UpdateCallType", $scope.callType.id, "linkRenderer", renderer.id);
    };

    $scope.selectRendererTheme = function (theme) {
      $scope.callType.rendererTheme = theme;
      saveAttribute("UpdateCallType", $scope.callType.id, "linkRendererTheme", theme.id);
    };

    $scope.saveName = function () {
      saveAttribute("UpdateCallType", $scope.callType.id, "setName", $scope.callType.name);
    };

    $scope.selectPolicy = function (policy) {
      $scope.callType.policy = policy;
      saveAttribute("UpdateCallType", $scope.callType.id, "linkPolicy", policy.id);
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

    $scope.isSourceSelected = function (sourceId) {
      if ($scope.callType && $scope.callType.source) {
        return sourceId === $scope.callType.source.id;
      }
      return false;
    };

    $scope.isRendererSelected = function (rendererId) {
      if ($scope.callType && $scope.callType.renderer) {
        return rendererId === $scope.callType.renderer.id;
      }
      return false;
    };

    $scope.isRendererThemeSelected = function (rendererThemeId) {
      if ($scope.callType && $scope.callType.rendererTheme) {
        return rendererThemeId === $scope.callType.rendererTheme.id;
      }
      return false;
    };

    $scope.isPolicySelected = function (policyId) {
      if ($scope.callType && $scope.callType.policy) {
        return policyId === $scope.callType.policy.id;
      }
      return false;
    };

    $scope.canBeDeleted = function () {
      if ($scope.callType.calls.length == 0) {
        return true;
      } else {
        return !($scope.current_zone.cannotBeDeleted);
      }
    }
  }]);
