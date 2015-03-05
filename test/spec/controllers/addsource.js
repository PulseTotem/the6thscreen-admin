'use strict';

describe('Controller: AddsourceCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var AddsourceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddsourceCtrl = $controller('AddsourceCtrl', {
      $scope: scope
    });
  }));

});
