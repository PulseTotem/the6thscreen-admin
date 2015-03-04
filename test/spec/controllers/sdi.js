'use strict';

describe('Controller: SdiCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var SdiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SdiCtrl = $controller('SdiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
