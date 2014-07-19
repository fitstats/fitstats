'use strict';

angular.module('fitStatsApp')

.factory('FormFunctions', function($filter, $resource, User){


  var retrieveDayStats = function () {
    return $resource('/api/fitnessData/:date', {
      //id: '@id',
      date: '@date',
    });
  };


  var retrieveOneStat = function (queryField, updateControllerFields) {
    var queryDate = this.date;
    //var userId = this.userId;

    var InputSubmition = $resource('/api/fitnessData/:date/:field', {
      //id: '@id',
      date: '@date',
      field: '@field'
    });

    InputSubmition.get({ date: queryDate, field: queryField })
      .$promise.then(function(response) {

        if (response.$resolved){
           console.log('Data successfully retrieved:', response.data);
           var updatedData = response.data;
           updateControllerFields(updatedData, queryField);

        } else {
          console.log('Error data does not exist');
        }
      });
  };


  var submitFieldValue = function(formData, queryField, updateControllerFields, currentDate) {

    var queryDate = currentDate;

    /* defining the PUT request */
    var InputSubmition = $resource('/api/fitnessData/:date/:field', {
      //id: '@userId',
      date: '@date',
      field: '@field'
    }, {
      'update': {
        method: 'PUT',
        isArray: false
      }
    });

    var inputSubmition = new InputSubmition();

    /* populate the request object to be submitted with relevant data */
    //inputSubmition.userId = this.userId;
    inputSubmition.date = queryDate;
    inputSubmition.field = queryField;
    inputSubmition.data = formData;

    /* action for when the response is returned */
    inputSubmition.$update({}, function (response) {
      updateControllerFields(response.data.data, response.data.field);
      console.log('Data successfully submitted:', response.data.field);
    });
  };



  var submitMultipleFields = function (submitionArray) {
  /**
   * SubmitMultipleFields separates the field submitions to db from
   * html forms that contain multiple 2x input fields
   * Each index of submitionArray contains all the arguments needed to
   * invoke this.submit for one specific field
   */
    var chainSubmitions = function (index) {
      this.submitFieldValue.apply(this, submitionArray[index]);

      if (index < submitionArray.length -1) {
        chainSubmitions(index +1);
      }
    }.bind(this);

    chainSubmitions(0);
  };


  return {
    userId: User.get(),
    retrieveDayStats: retrieveDayStats,
    retrieveOneStat: retrieveOneStat,
    submitFieldValue: submitFieldValue,
    submitMultipleFields: submitMultipleFields,
    rawDate: undefined
  };
});


/* Object returned from submit to server:
{
  $promise: undefined
  $resolved: true
  data: "success"
  __proto__: Resource
  $delete: function (params, success, error) {}
  $get: function (params, success, error) {}
  $query: function (params, success, error) {}
  $remove: function (params, success, error) {}
  $save: function (params, success, error) {}
  $update: function (params, success, error) {}
*/
