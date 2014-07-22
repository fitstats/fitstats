'use strict';

angular.module('fitStatsApp')


.factory('StatsFactory', function($resource) {

  var retrieveSevenDaysStats = function (today, field) {
    
  	//TODO:
  	//Retrieve seven days data for /googleChart/:field
	  //according to today's date.

  };


  return {
  	retrieveSevenDaysStats: retrieveSevenDaysStats
  };

})

  
