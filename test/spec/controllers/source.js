'use strict';

describe('Controller: SourceCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var SourceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SourceCtrl = $controller('SourceCtrl', {
      $scope: scope
    });
  }));

});
