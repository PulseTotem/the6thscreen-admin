'use strict';

describe('Controller: AddzoneCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var AddzoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddzoneCtrl = $controller('AddzoneCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
