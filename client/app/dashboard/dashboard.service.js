'use strict';

angular.module('fitStatsApp')

.factory('FormFunctions', function($filter, $resource, User, $http){



  var retrieveDayStats = function () {
    return $resource('/api/fitnessData/:date', {
      date: '@date',
    });
  };



  var submitFieldValue = function(formData, queryField, updateControllerFields, currentDate) {
    var queryDate = currentDate;

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


  var submitMultipleFields = function (submitionArray) {
  /**
   * 'SubmitMultipleFields' separates the html input submissions for single forms that
   * that contain (>=2) input fields.
   * Each index of 'submitionArray' contains all the arguments needed to
   * invoke 'FormFunctions.submit' for one specific field.
   *
   * ∆ Missing logic in the server to submit multiple fields at once.
   */
    var chainSubmission = function (index) {
      this.submitFieldValue.apply(this, submitionArray[index]);

      if (index < submitionArray.length -1) {
        chainSubmission(index +1);
      }
    }.bind(this);

    chainSubmission(0);
  };





  return {
    /* mfpId: ready access to mfpId on signin for: DashboardCtrl's getMfpData method */
    mfpId: User.getMFP(),
    /* rawDate: to be sync'ed to the current page's date */
    rawDate: undefined,
    retrieveDayStats: retrieveDayStats,
    submitFieldValue: submitFieldValue,
    /* submitMultipleFields feeds multiple joined fields one by one to submitFieldValue */
    submitMultipleFields: submitMultipleFields,
  };
});
