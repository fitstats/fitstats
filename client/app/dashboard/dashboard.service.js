'use strict';

angular.module('fitStatsApp')

.factory('FormFunctions', function($filter, $resource){

  var submit = function(formData, field, decimals, userId) {
    var data = $filter('number')(formData, decimals);
    var date = $filter('date')(new Date(), 'yyyyMMdd');
    console.log('userid', userId);

    var Weight = $resource('/api/fitnessData/weight', {},
      {
        'update': {
        method: 'PUT',
        isArray: false
      }
    });

    var weightData = new Weight();        //weight.$save()

    weightData.userId = userId;
    weightData.date = date;
    weightData.weight = formData;
    
    weightData.$update({}, function (data) {
      debugger;
      console.log('weight data posted');
    });



  };
  return {
    submit: submit,
  };
});
