(function() {
  'use strict';

  angular
    .module('exampleCableApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
