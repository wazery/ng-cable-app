(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('ChatFormController', ChatFormController);

  function ChatFormController($rootScope, $scope, $http, $log, toaster, $cookieStore) {

    $scope.submit = function(data) {

      var room_id = String($rootScope.currentRoom.id);

      $http.post('http://0.0.0:5000/rooms/' + room_id + '/messages',
        {
          "room_id": room_id,
          "current_user": String($cookieStore.get('loggedUser').id),
          "message": {"content": data}
        })
        .then(function (data) {
          $log.info('in chat form controller');
      });
    };

  };

})();


