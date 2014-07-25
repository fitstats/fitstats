'use strict';

angular.module('fitStatsApp')
  .controller('StatsCtrl', function ($scope, $stateParams, $location, StatsFactory) {

    // Sets retrieval parameters:
    // **TODO: Field currently defaults to 'weight' field when all is selected.. 
    //         need to make something happen for all.
    var field = $stateParams.field === 'all' ? 'weight' : $stateParams.field;
    var fields = StatsFactory.fields;
    var date = $stateParams.date || StatsFactory.makeDate( new Date() );

    // Requests last 7 days of data
    StatsFactory.retrieveSevenDaysStats( field, date )
    .$promise.then(function(successResponse) {
      // Creates chart rows
      var rows = StatsFactory.makeChartRows( successResponse.data, field );
      // Creates chart columns
      var cols = StatsFactory.makeChartColumns( field );
      // Set the title of the current chart
      $scope.chartTitle = fields[ field ].title;
      // Constructs a chart based on the above data and sets it equal to the scope chart
      $scope.googleChart = StatsFactory.createChart( 
        'LineChart', 
        {chartTitle: fields[ field ].title, cols: cols, rows: rows},
        field 
      );
    }, function() {
      console.log('GET request fail for field: '+ field);
    });

  })

