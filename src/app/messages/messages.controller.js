(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('MessagesController', MessagesController);

  function MessagesController($rootScope, $scope, $http, $log, toaster) {
    $http.get('http://0.0.0.0:5000/messages.json')
      .success(function (data) {
        $scope.messages = data; // response data
    })
      .error(function (data) {
        $log.info(data);
    });

    $scope.fire = function(message) {
      $rootScope.$broadcast('getCommentsFor', message);
      $rootScope.currentMessage = message;
    };
  };

})();
