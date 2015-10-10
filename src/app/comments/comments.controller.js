(function() {
  'use strict'

  angular
    .module('exampleCableApp')
    .controller('CommentsController', CommentsController);

  function CommentsController($scope, $http, $log, toaster) {

    $scope.$on('getCommentsFor', function(event, message) {

      $http.get('http://0.0.0.0:5000/messages/' + String(message.id) + '.json')
        .then(function (data) {
          $scope.comments = data.data; // response data

          toaster.pop('success', 'Entered the room', 'Successfully logged into ' + String(message.title));
      });
    });

  };

})();

