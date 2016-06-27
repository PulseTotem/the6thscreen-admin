'use strict';

/**
 * @ngdoc service
 * @name T6SCommon.oauthdManager
 * @description
 * # oauthdManager
 * Factory in the the6thscreenAdminApp.
 */
angular.module('T6SCommon')
	.factory('oauthdManager', [function() {

		return {
			connectToProvider: function(providerName, successCB, failCB) {
				//initialize OAuth.io with public key of the application
				OAuth.setOAuthdURL("https://oauthd.pulsetotem.fr/");
				OAuth.initialize('zTth1pnoAfmRXwRDKoLe1ng47ng', {cache:true});//Oauth.io
				//try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
        OAuth.popup(providerName, {cache:false}).done(function(result) { //cache means to execute the callback if the tokens are already present
          successCB(result.toJson());
        }).fail(function(error) {
          failCB(error);
        });
			}
		}

	}])
