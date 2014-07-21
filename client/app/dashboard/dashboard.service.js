'use strict';

angular.module('fitStatsApp')

.factory('DashboardFactory', function($filter, $resource, User, $http){


  var retrieveDayStats = function (updateControllerFields, queryDate) {
    $resource('/api/fitnessData/:date', {
      date: '@date',
    })
    .get({date: queryDate})
    .$promise.then(function(successResponse) {

      _.forEach(successResponse.data, function (singleData, field) {
        updateControllerFields(singleData, field);
      });
    }, function() {
      console.log('GET request fail for day: '+ $scope.urlDate);
    });

  };



  var updateDatabase = function(dataToUpdate, queryField, updateControllerFields, queryDate) {debugger;

    var InputSubmission = $resource('/api/fitnessData/:date/:field', {
      date: '@date',
      field: '@field'
    }, {
      'update': {
        method: 'PUT',
        isArray: false
      }
    });
    var inputSubmission = new InputSubmission();

    /* populate the request object to be submitted with relevant data */
    inputSubmission.date = queryDate;
    inputSubmission.field = queryField;
    inputSubmission.data = dataToUpdate;

    /* action for when the response is returned */
    inputSubmission.$update({}, function (response) {debugger;
      if (response.data.field != 'multifields'){
        updateControllerFields(response.data.data, response.data.field);
      } else {
        for (var field in response.data.data) {
          updateControllerFields(response.data.data[field], field);
        }
      }

    });
  };



  var fetchMfpData = function(updateControllerFields, queryDate) {debugger;
    var mfpUserId;

    if (typeof this.mfpId.data === 'string') {
      mfpUserId = this.mfpId.data;
    } else {
      mfpUserId = window.prompt('What is your MFP user ID?');
    }
    $http.get('/api/mfp/' + mfpUserId + '/' + queryDate)
    .success( function(data) { debugger;
      if (!data.data.private) {
        if (data.data.calories || data.data.protein || data.data.carbs || data.data.fat) {

          data.data.calories =  ( (Number(data.data.protein) * 4) +
                                      (Number(data.data.carbs) * 4) +
                                      (Number(data.data.fat) * 9) ) || undefined;
          updateDatabase(data.data, 'multifields', updateControllerFields, queryDate);

        } else {
          window.alert('No data for this day');
        }
      } else {
        window.alert('This profile is private');
      }
    });
  };




  return {
    mfpId: User.getMFP(),                       /* mfpId: ready access to mfpId on signin for: DashboardCtrl's getMfpData method */
    rawDate: undefined,                         /* rawDate: to be sync'ed to the current page's date */
    retrieveDayStats: retrieveDayStats,
    updateDatabase: updateDatabase,
    fetchMfpData: fetchMfpData
  };
});
