'use strict';

angular.module('fitStatsApp')


.factory('StatsFactory', function($resource) {
	//Retrieve seven days data for /stats/:field
  var retrieveSevenDaysStats = function (today, field) {
    $resource('/api/stats/:field', {
      field: '@field'
    })
    .get({date: today, field: field})
    .$promise.then(function(successResponse) {

      //Successfully get data from database
      console.log('SuccessResponse is :', successResponse);
      
    }, function() {
      console.log('GET request fail for day: '+ queryDate);
    });
  };
});

