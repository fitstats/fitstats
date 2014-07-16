'use strict';

angular.module('fitStatsApp')

.factory('FormFunctions', function($filter, $resource, Auth, $timeout){


  var retrieve = function (field, updateField, date) {
    var date = this.date;

    var InputSubmition = $resource('/api/fitnessData/:id/:date/:field', {
      id: '@userId',
      date: '@date',
      field: '@field'
    }, {
      'update': {
        method: 'GET',
        isArray: false
      }
    });

    var inputSubmition = new InputSubmition();        //weight.$save()

    inputSubmition.userId = this.userId;
    inputSubmition.date = date;
    inputSubmition.field = field;

    inputSubmition.$update({}, function (data) {
        console.log('Data successfully retrieved:', data.data);
        var data = data.data;
        updateField(data, field);
    });

  };



  var submit = function(formData, field, decimals, updateField) {

    var inputData = $filter('number')(formData, decimals);
    var date = this.date;

    var InputSubmition = $resource('/api/fitnessData/:id/:date/:field', {
      id: '@userId',
      date: '@date',
      field: '@field'
    }, {
      'update': {
        method: 'PUT',
        isArray: false
      }
    });

    var inputSubmition = new InputSubmition();

    inputSubmition.userId = this.userId;
    inputSubmition.date = date;
    inputSubmition.field = field;
    inputSubmition.data = inputData;


    inputSubmition.$update({}, function (response) {
      updateField(response.data.data, response.data.field);
      console.log('Data successfully submitted:', response.data.field);
    });
  };


  var submitMultipleFields = function (submitionArray, context) {
    var that = this;

    var chainSubmitions = function (index) {
      $timeout(function(){
        that.submit.apply(context, submitionArray[index]);

        if (index < submitionArray.length -1) {
          chainSubmitions(index +1);
        }
      }, 500);
    };

    chainSubmitions(0);
  };


  return {
    userId: Auth.getCurrentUser()._id,
    date: $filter('date')(new Date(), 'yyyyMMdd'),
    retrieve: retrieve,
    submit: submit,
    submitMultipleFields: submitMultipleFields
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
