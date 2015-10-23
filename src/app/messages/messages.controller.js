(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('MessagesController', MessagesController);

  function MessagesController($scope, $http, $log, toaster, $cable) {

    $scope.$on('getMessagesFor', function(event, room) {

      $http.get('http://0.0.0.0:5000/rooms/' + String(room.id) + '.json')
        .then(function (data) {
          $scope.messages = data.data; // response data

          toaster.pop('success', 'Entered the room', 'Successfully logged into ' + String(room.title));
      });
    });

    var cable = $cable('ws://0.0.0.0:28080');
    var channel = cable.subscribe('RoomsChannel', { received: function(newMessage){
      $log.info(newMessage);
      toaster.pop('success', 'New message', newMessage.body);
      $scope.messages.push(newMessage);
    }});

  };

})();

