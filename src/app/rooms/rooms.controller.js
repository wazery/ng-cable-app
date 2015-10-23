(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('RoomsController', RoomsController);

  function RoomsController($rootScope, $scope, $http, $log, toaster, $cable) {
    $http.get('http://0.0.0.0:5000/rooms.json')
      .success(function (data) {
        $scope.rooms = data; // response data
    })
      .error(function (data) {
        $log.info(data);
    });

    $scope.fire = function(room) {
      $rootScope.$broadcast('getMessagesFor', room);
      $rootScope.currentRoom = room;
    };

    // var cable = $cable('ws://0.0.0.0:28080');
    // var channel = cable.subscribe('RoomsChannel', { received: function(newComment){
    //   $log.info(newComment);
    //   toaster.pop('success', 'New message', newComment.body);
    //   $scope.comments.push(newComment);
    // }});
  }

})();
