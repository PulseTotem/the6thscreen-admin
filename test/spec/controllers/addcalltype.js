'use strict';

describe('Controller: AddcalltypeCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var AddcalltypeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcalltypeCtrl = $controller('AddcalltypeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
