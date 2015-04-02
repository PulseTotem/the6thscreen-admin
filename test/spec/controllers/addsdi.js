'use strict';

describe('Controller: AddsdiCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var AddsdiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddsdiCtrl = $controller('AddsdiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
