(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('ChatFormController', ChatFormController);

  function ChatFormController($rootScope, $scope, $http, $log, toaster, $cookieStore) {

    $scope.submit = function() {

      $http.post('http://0.0.0:5000/messages/' + String($rootScope.currentMessage.id) + '/comments',
        {"message_id": String($rootScope.currentMessage.id),
         "current_user": String($cookieStore.get('loggedUser').id),
         "comment": {"content": $scope.content}
        })
        .then(function (data) {
          $log.info('in chat form controller');
      });
    };

  };

})();


