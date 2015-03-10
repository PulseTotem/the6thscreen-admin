'use strict';

/**
 * @ngdoc overview
 * @name the6thscreenAdminApp
 * @description
 * # translation
 *
 * Define translation configuration for application.
 */
angular
    .module('the6thscreenAdminApp')
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locales/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage(['en', 'fr']);
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useMissingTranslationHandlerLog();
    }]);

