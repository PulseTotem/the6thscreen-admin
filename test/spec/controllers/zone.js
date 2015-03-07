'use strict';

describe('Controller: ZoneCtrl', function () {

  // load the controller's module
  beforeEach(module('the6thscreenAdminApp'));

  var ZoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ZoneCtrl = $controller('ZoneCtrl', {
      $scope: scope
    });
  }));

});
