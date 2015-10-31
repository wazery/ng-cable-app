(function() {
  'use strict';

  var actionCableExampleApp = angular
    .module('exampleCableApp', ['ngAnimate',
                            'ngCookies',
                            'ngTouch',
                            'ngSanitize',
                            'ngResource',
                            'ui.router',
                            'ui.bootstrap',
                            'toaster',
                            'ngCable']);

  actionCableExampleApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);

})();
