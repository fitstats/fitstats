'use strict';

angular.module('fitStatsApp')


.factory('DashboardFactory', function($filter, $resource, User, $http) {

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
      console.log('GET request fail for day: '+ queryDate);
    });

  };

  var updateDatabase = function(dataToUpdate, queryField, updateControllerFields, queryDate) {
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
    inputSubmission.$update({}, function (response) {
      if (response.data.field !== 'multifields') {
        updateControllerFields(response.data.data, response.data.field);
      } else {
        for (var field in response.data.data) {
          updateControllerFields(response.data.data[field], field);
        }
      }

    });
  };



  var fetchMfpData = function(updateControllerFields, queryDate) {
    var mfpUserId;

    if (typeof this.mfpId.data === 'string') {
      mfpUserId = this.mfpId.data;
    } else {
      mfpUserId = window.prompt('What is your MFP user ID?');
    }

    $http.get('/api/mfp/' + mfpUserId + '/' + queryDate)
    .success( function(data) {
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
    rawDate: undefined,                         /* rawDate: to be sync'ed to the current page's date ∆∆ should be moved to DashboardDateFactory*/
    retrieveDayStats: retrieveDayStats,
    updateDatabase: updateDatabase,
    fetchMfpData: fetchMfpData
  };
})




.factory('DashboardDateFactory', function ($stateParams, DashboardFactory, $filter, $state) {


  var findCurrentDate = function (updateDateContext) {

    if ($stateParams.date === 'today') {
      /* Set the date to present, clone it into Factory for a reference (accessible when page reloads), update scope */
      var date = new Date ();
      var filteredDate = $filter('date')(date, 'yyyyMMdd');
      updateDateContext('Today', date, date, filteredDate);

    } else if (DashboardFactory.rawDate instanceof Date) {
      /* If nextDay() || previousDay(), set the context dates to the stored raw reference */
      var currentCalendarDay =  $filter('date')(new Date(), 'yyyyMMdd');
      var dateToDisplay = $filter('date')(DashboardFactory.rawDate, 'yyyyMMdd');
      var title = currentCalendarDay === dateToDisplay  ? 'Today':'Date';
      updateDateContext(title, DashboardFactory.rawDate, DashboardFactory.rawDate, $stateParams.date);

    } else if (!isNaN(Number($stateParams.date) %1)) {
      /* For when the page is refreshed || url date is directly edited by client */
      var presentDate = new Date();
      var presentDateFiltered = $filter('date')(presentDate, 'yyyyMMdd');
      var refreshedDate = $stateParams.date;

      if (presentDateFiltered === refreshedDate) {
        /* if date tempered with === 'today' */
        updateDateContext('Today', presentDate, presentDate, refreshedDate);

      } else {
        var year = refreshedDate.slice(0, 4);
        var month = (refreshedDate.slice(4, 6) -1);
        var day = refreshedDate.slice(6);
        var newDate = new Date(year, month, day);

        updateDateContext('Date', newDate, newDate, refreshedDate);

      }
    } else {
      /* if all else fails, redirect back today's context */
      $state.go('dashboard', {date: 'today'} );
    }
  };


  var nextDay = function () {
    DashboardFactory.rawDate.setDate(DashboardFactory.rawDate.getDate() + 1);
    var newUrlState = $filter('date')(DashboardFactory.rawDate, 'yyyyMMdd');
    $state.go('dashboard', {date: newUrlState} );
  };

  var previousDay = function() {
    DashboardFactory.rawDate.setDate(DashboardFactory.rawDate.getDate() - 1);
    var newUrlState = $filter('date')(DashboardFactory.rawDate, 'yyyyMMdd');
    $state.go('dashboard', {date: newUrlState} );
  };

  var resetDate = function () {
    $state.go('dashboard', {date: 'today'} );
  };

  return {
    findCurrentDate: findCurrentDate,
    nextDay: nextDay,
    previousDay: previousDay,
    resetDate: resetDate
  };
});
