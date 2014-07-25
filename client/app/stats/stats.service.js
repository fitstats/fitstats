'use strict';

angular.module('fitStatsApp')


.factory('StatsFactory', function($resource, $http) {

  // Object for labeling the chart with information related to each field
  var fields = { 
    weight: { title: 'Weight Change Over Time', label: 'Weight (lbs)', units: 'lbs' },
    bf: { title: 'Body Fat % Change Over Time', label: 'Body Fat (%)', units: '%' },
    hr: { title: 'Resting Heart Rate Change Over Time', label: 'Heart Rate (BPM)', units: 'BPM' },
    bps: { title: 'Blood Pressure Change Over Time', label: 'Systolic (mmHg)', units: 'mmHg' },
    bpd: { title: 'Blood Pressure Change Over Time', label: 'Diastolic (mmHg)', units: 'mmHg' },
    bp: { title: 'Blood Pressure Change Over Time', label: 'Diastolic (mmHg)', units: 'mmHg' },
    calories: { title: 'Calories Consumed Over Time', label: 'Calories (kcal)', units: 'kcal' },
    protein: { title: 'Protein Consumed Over Time', label: 'Protein (g)', units: 'g' },
    carbs: { title: 'Carbs Consumed Over Time', label: 'Carbs (g)', units: 'g' },
    fat: { title: 'Fat Consumed Over Time', label: 'Fat (g)', units: 'g' }
  };

  // Creates a string date using a new js date
  var makeDate = function( date ) {
    var addZero = function( number ) {
      return number < 10 ? '0' + number : number;
    };
    var stringDate = 
      '' + date.getFullYear() +
      ( addZero( date.getMonth() + 1 ) ) +
      addZero( date.getDate() );
    return stringDate;
  };

  // Converts datUrl string into a resonable chart representation
  var makeChartDate = function( date ) {
    var month = parseInt( date.slice( 4, 6 ) ).toString();
    var day = parseInt( date.slice( 6 ) ).toString();
    return month + '-' + day;
  };

  // Creates rows for the last 7 days of data relating to the chosen field
  var makeChartRows = function( data, field ) {
    var rows = [];
    if( field !== 'bp' ){
      data.forEach( function( fitnessData ) {
        var date = makeChartDate( fitnessData.date );
        var fieldData = fitnessData[ field ];
        var row = { c: [ { v : date }, { v: fieldData, f: fieldData + fields[ field ].units } ] };
        rows.push( row )
      })
    } else {
    // Exception for blood pressure which displays multiple fields at once
      data.forEach( function( fitnessData ) {
        var date = makeChartDate( fitnessData.date );
        var bps = fitnessData.bps;
        var bpd = fitnessData.bpd;
        var row = { c: [ 
            { v : date }, 
            { v: bps, f: bps + fields.bps.units },
            { v: bpd, f: bpd + fields.bpd.units }
          ] };
        rows.push( row )
      })  
    }
    return rows;
  };
  
  // Creates columns for the last 7 days of data relating to the chosen field
  var makeChartColumns = function( field ) {
    var cols = [{ id: 'month', label: 'Month', type: 'string', p: {} }];
    if( field !== 'bp' ) {
      var fieldCol = { id: 'field-id', label: fields[ field ].label, type: 'number', p: {} }
      cols.push( fieldCol );
    } else {
    // Exception for blood pressure which displays multiple fields at once
      var fieldCol1 = { id: 'field-id', label: fields.bps.label, type: 'number', p: {} }
      var fieldCol2 = { id: 'field-id', label: fields.bpd.label, type: 'number', p: {} }
      cols.push( fieldCol1 );
      cols.push( fieldCol2 );
    }
    return cols;
  };

  // Creates a chart in the proper format for googleCharts
  var createChart = function( chartType, chartData, field ) {
    return {
      type: chartType,
      displayed: true,
      data: chartData,
      options: {
        // title: fields[ field ].title,
        isStacked: true,
        fill: 20,
        displayExactValues: true,
        vAxis: {
          title: fields[ field ].label,
          gridlines: {
            count: 10
          }
        },
        hAxis: {
          title: 'Date'
        }
      },
      formatters: {},
      view: {}
    }
  };

  // Sends a get request to api/googlecharts with a field and date
  var retrieveSevenDaysStats = function( field, today ) {

    return $resource('/api/googleChart/:field/:date', {
      date: '@today',
      field: '@field'
    })
    .get({field: field, date: today})
  };

  return {
    retrieveSevenDaysStats: retrieveSevenDaysStats,
    makeChartRows: makeChartRows,
    makeChartColumns: makeChartColumns,
    createChart: createChart,
    fields: fields,
    makeDate: makeDate
  };
    
})


  
