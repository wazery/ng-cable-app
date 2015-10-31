(function() {
  'use strict';

  angular
    .module('exampleCableApp')
    .controller('RoomsController', RoomsController);

  function RoomsController($rootScope, $scope, $http, $log) {
    $http.get('http://api-cable.herokuapp.com/rooms')
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
  }

})();
