var webrtc = angular.module('webrtc', ['ngRoute', 'pascalprecht.translate']);

webrtc.config(['$translateProvider', function ($translateProvider) {
    $translateProvider
        .useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        })
        .preferredLanguage('en');
}]);

webrtc.config(function($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: "./index.html",
            //controller
        })
});
