'use strict';

describe('Service: callbackManager', function () {

  // load the service's module
  beforeEach(module('the6thscreenAdminApp'));

  // instantiate service
  var callbackManager;
  beforeEach(inject(function (_callbackManager_) {
    callbackManager = _callbackManager_;
  }));

  it('should do something', function () {
    expect(!!callbackManager).toBe(true);
  });

});
