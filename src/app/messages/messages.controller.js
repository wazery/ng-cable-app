(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('MessagesController', MessagesController);

  function MessagesController($rootScope, $scope, $http, $log, toaster, $cable) {
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
    var messagesCable = $cable('http://0.tcp.ngrok.io:52176');
    messagesCable.cable.createSubscription('messagesChannel', function(newMessage){
      $scope.messages.unshift(newMessage);
    });
  }

})();
