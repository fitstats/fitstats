'use strict';

angular.module('fitStatsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stats', {
        url: '/stats/:field',
        templateUrl: 'app/stats/stats.html',
        controller: 'StatsCtrl',
        authenticate: true
      });
  });
