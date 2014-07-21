'use strict';

angular.module('fitStatsApp')

.factory('DashboardFactory', function($filter, $resource, User, $http){


  var retrieveDayStats = function () {
    return $resource('/api/fitnessData/:date', {
      date: '@date',
    });
  };


  var submitFieldValue = function(formData, queryField, updateControllerFields, queryDate) {

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
    inputSubmission.data = formData;

    /* action for when the response is returned */
    inputSubmission.$update({}, function (response) {
      updateControllerFields(response.data.data, response.data.field);
    });
  };



  var submitMultipleFields = function (submissionObj, updateControllerFields, queryDate) {
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
    inputSubmission.field = 'multifields';
    inputSubmission.data = submissionObj;

    /* action for when the response is returned */
    inputSubmission.$update({}, function (response) {
      for (var field in response.data.data) {
        updateControllerFields(response.data.data[field], field);
      }
    });

  };





  return {

    mfpId: User.getMFP(),                       /* mfpId: ready access to mfpId on signin for: DashboardCtrl's getMfpData method */
    rawDate: undefined,                         /* rawDate: to be sync'ed to the current page's date */
    retrieveDayStats: retrieveDayStats,
    submitFieldValue: submitFieldValue,
    submitMultipleFields: submitMultipleFields  /* submitMultipleFields feeds multiple joined fields one by one to submitFieldValue */

  };
});
