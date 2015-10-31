(function() {
  'use strict';

  angular
    .module('exampleCableApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, toaster, $log, $cookieStore) {
    // $scope.isLive = cable.client.connection.isOpen();
    // TODO: Check the connection heartbeat
    $scope.isLive = true;
    $scope.selected = $cookieStore.get('loggedUser');
  }
})();
