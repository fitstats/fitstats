'use strict';

angular.module('fitStatsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.login = function() {
      Auth.login();
      $location.path('/dashboard');
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      if ( route === '/dashboard' && $location.path().indexOf('/dashboard') !== -1 ) {
        return '/dashboard';
      } else if ( route === '/stats' && $location.path().indexOf('/stats') !== -1 ) {
        return '/stats';
      }
      return route === $location.path();
    };
  });
