'use strict';

angular.module('fitStatsApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $timeout) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home

          //get rid of $timeout. currently used because $location.path fires
          //before Auth.isLoggedIn() returns true; something to do with promises
          $timeout(function(){
            $location.path('/dashboard');
          },500);
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
