(function() {
  'use strict';

  angular
    .module('exampleCableApp')
    .controller('MessagesController', MessagesController);

  function MessagesController($rootScope, $scope, $http, $log, toaster, $cable, $cookieStore) {
    var user = $cookieStore.get('loggedUser');
    var room = {
      id: 0,
      title: ''
    };

    $scope.$on('getMessagesFor', function(event, currentRoom) {
      room = currentRoom;

      $http.get('http://api-cable.herokuapp.com/rooms/' + String(room.id))
        .then(function (data) {
          $scope.messages = data.data; // response data
          toaster.pop('success', 'Entered the room', 'Successfully logged into ' + String(room.title));
      });

      // Open the socket connection
      // TODO: Move the URL to env configs
      var cable = $cable('ws://api-cable.herokuapp.com/websocket/');
      var channel = cable.subscribe({
        channel: 'MessagesChannel',
        room: room.title
      }, {
        received: function(newMessage) {
          if (newMessage) {
            $log.info('Got a new message');
            $log.info(newMessage.body);
            toaster.pop('success', 'New message', newMessage.body);
            $scope.messages.push(newMessage);
          }
        }
      });

      $scope.form = {
        body: ''
      };

      $scope.submit = function() {
        var status = channel.send({ user_id: user.id, room_id: room.id, body: $scope.form.body });
        if (status) {
          toaster.pop('success', 'Successfully sent the message');
        } else {
          toaster.pop('error', 'Failed to send the message');
        }
        $scope.form.body = '';
      };
    });
  }

})();
