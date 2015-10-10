(function() {
  'use strict';

  angular
    .module('exampleCableApp')
    .controller('ModalsController', function ($scope, $uibModal, $log, $http, toaster, $cookieStore) {

    // Get cookie
    var loggedUserCookie = $cookieStore.get('loggedUser');

    if (loggedUserCookie) {
      $scope.isUserLoggedIn = true;
    } else {
      $scope.isUserLoggedIn = false;
    };

    $scope.logout = function(){
      toaster.pop('success', 'Successfully logged out!', 'You are now logged out!');
      // Remove the current logged in user from the cookie store
      $cookieStore.remove('loggedUser');
      $scope.isUserLoggedIn = false;
    };

    $scope.login = function (size) {

      $http.get('http://0.0.0.0:5000/session/new.json')
        .success(function (data) {
          $scope.users = data; // response data

          if ($scope.users) {
            var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'app/modals/modalContent.html',
              controller: 'ModalInstanceController',
              size: size,
              resolve: {
                users: function () {
                  return $scope.users;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
              $scope.isUserLoggedIn = true;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          } else {
            toaster.pop('error', "Can't get users data from the server", "Please check the connection");
          };

        })
        .error(function (data) {
          $log.info(data);
          toaster.pop('error', "Couldn't login!", 'Please try again!');
        });
    }

  });

  // Please note that $modalInstance represents a modal window (instance) dependency.
  // It is not the same as the $uibModal service used above.
  angular
    .module('exampleCableApp')
    .controller('ModalInstanceController', function ($scope, $modalInstance, users, toaster, $cookieStore) {

    $scope.users = users;
    if ($scope.users) {
      $scope.selected = { user: $scope.users[0] };
    } else {
      $scope.selected = { user: null };
    }

    $scope.ok = function () {
      $modalInstance.close($scope.selected.user);

      $scope.selected = { user: $scope.selected.user };
      // Save the selected user into a cookie
      $cookieStore.put('loggedUser', $scope.selected.user);

      toaster.pop('success', 'Successfully logged in', "Logged in as " + String($scope.selected.user.name));
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
      toaster.pop('error', 'You canceled the login', "Please do login, to try the app ");
    };
  });

})();
