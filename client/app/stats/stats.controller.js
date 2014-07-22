'use strict';

angular.module('fitStatsApp')
  .controller('StatsCtrl', function ($scope, $stateParams, $location) {

  //todo: replace chartData with live data from server instead of prefilled data
  //expect database helper method to retrieve data in the following format:
  // for 'weight' request, {7-14: 175.2}
  // for 'bf' request, {7-14: 13.2}
  // etc...

    $scope.fields = {
      'weight': {
        chartTitle: 'Weight Change Over Time',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Weight (lbs)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 175.0, 'f': '175.0 lbs'} ] },
            {'c': [ {'v': '7-14'}, {'v': 175.2, 'f': '175.2 lbs'} ] },
            {'c': [ {'v': '7-15'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
            {'c': [ {'v': '7-16'}, {'v': 174.2, 'f': '174.2 lbs'} ] },
            {'c': [ {'v': '7-17'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
            {'c': [ {'v': '7-18'}, {'v': 173.8, 'f': '173.8 lbs'} ] }
          ]
        }
      },
      'bf': {
        chartTitle: 'Body Fat % Change Over Time',
        chartLabel: 'Body Fat (%)',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Weight (lbs)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 13.2, 'f': '13.2 %'} ] },
            {'c': [ {'v': '7-14'}, {'v': 13.2, 'f': '13.2 %'} ] },
            {'c': [ {'v': '7-15'}, {'v': 13.0, 'f': '13.0 %'} ] },
            {'c': [ {'v': '7-16'}, {'v': 12.6, 'f': '12.6 %'} ] },
            {'c': [ {'v': '7-17'}, {'v': 12.8, 'f': '12.8 %'} ] },
            {'c': [ {'v': '7-18'}, {'v': 12.6, 'f': '12.6 %'} ] }
          ]
        }
      },
      'hr': {
        chartTitle: 'Resting Heart Rate Change Over Time',
        chartLabel: 'Heart Rate (BPM)',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Weight (lbs)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 75, 'f': '75 bpm'} ] },
            {'c': [ {'v': '7-14'}, {'v': 70, 'f': '70 bpm'} ] },
            {'c': [ {'v': '7-15'}, {'v': 72, 'f': '72 bpm'} ] },
            {'c': [ {'v': '7-16'}, {'v': 65, 'f': '65 bpm'} ] },
            {'c': [ {'v': '7-17'}, {'v': 68, 'f': '68 bpm'} ] },
            {'c': [ {'v': '7-18'}, {'v': 70, 'f': '70 bpm'} ] }
          ]
        }
      },
      'bp': {
        chartTitle: 'Blood Pressure Change Over Time',
        chartLabel: 'Blood Pressure (mmHg)',
        chartData: [  {'c': [ {'v': '7-13'}, {'v': 175.0, 'f': '175.0 lbs'} ] },
                      {'c': [ {'v': '7-14'}, {'v': 175.2, 'f': '175.2 lbs'} ] },
                      {'c': [ {'v': '7-15'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-16'}, {'v': 174.2, 'f': '174.2 lbs'} ] },
                      {'c': [ {'v': '7-17'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-18'}, {'v': 173.8, 'f': '173.8 lbs'} ] }
                    ],
      },
      'calories': {
        chartTitle: 'Calories Consumed Over Time',
        chartLabel: 'Calories (kcal)',
        chartData: [  {'c': [ {'v': '7-13'}, {'v': 175.0, 'f': '175.0 lbs'} ] },
                      {'c': [ {'v': '7-14'}, {'v': 175.2, 'f': '175.2 lbs'} ] },
                      {'c': [ {'v': '7-15'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-16'}, {'v': 174.2, 'f': '174.2 lbs'} ] },
                      {'c': [ {'v': '7-17'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-18'}, {'v': 173.8, 'f': '173.8 lbs'} ] }
                    ],

      },
      'protein': {
        chartTitle: 'Protein Consumed Over Time',
        chartLabel: 'Protein (g)',
        chartData: [  {'c': [ {'v': '7-13'}, {'v': 175.0, 'f': '175.0 lbs'} ] },
                      {'c': [ {'v': '7-14'}, {'v': 175.2, 'f': '175.2 lbs'} ] },
                      {'c': [ {'v': '7-15'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-16'}, {'v': 174.2, 'f': '174.2 lbs'} ] },
                      {'c': [ {'v': '7-17'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-18'}, {'v': 173.8, 'f': '173.8 lbs'} ] }
                    ],
      },
      'carbs': {
        chartTitle: 'Carbs Consumed Over Time',
        chartLabel: 'Carbs (g)',
        chartData: [  {'c': [ {'v': '7-13'}, {'v': 175.0, 'f': '175.0 lbs'} ] },
                      {'c': [ {'v': '7-14'}, {'v': 175.2, 'f': '175.2 lbs'} ] },
                      {'c': [ {'v': '7-15'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-16'}, {'v': 174.2, 'f': '174.2 lbs'} ] },
                      {'c': [ {'v': '7-17'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-18'}, {'v': 173.8, 'f': '173.8 lbs'} ] }
                    ],
      },
      'fat': {
        chartTitle: 'Fat Consumed Over Time',
        chartLabel: 'Fat (g)',
        chartData: [  {'c': [ {'v': '7-13'}, {'v': 175.0, 'f': '175.0 lbs'} ] },
                      {'c': [ {'v': '7-14'}, {'v': 175.2, 'f': '175.2 lbs'} ] },
                      {'c': [ {'v': '7-15'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-16'}, {'v': 174.2, 'f': '174.2 lbs'} ] },
                      {'c': [ {'v': '7-17'}, {'v': 174.6, 'f': '174.6 lbs'} ] },
                      {'c': [ {'v': '7-18'}, {'v': 173.8, 'f': '173.8 lbs'} ] }
                    ],
      }
    };

    //if valid sub-route, do stuff
    if ($scope.fields[$stateParams.field]) {
      $scope.chartTitle = $scope.fields[$stateParams.field].chartTitle;

      //Refactor out into a separate factory with "createChart(chartType, data)" method
      $scope.googleChart = {
        'type': 'LineChart',
        'displayed': true,
        'data': $scope.fields[$stateParams.field].chartData,
        /* more chart options: https://developers.google.com/chart/interactive/docs/gallery/linechart */
        'options': {
          //'title': 'Some Title',
          'isStacked': 'true',
          'fill': 20,
          'displayExactValues': true,
          'vAxis': {
            'title': $scope.fields[$stateParams.field].chartLabel,
            'gridlines': {
              'count': 10
            }
          },
          'hAxis': {
            'title': 'Date'
          }
        },
        'formatters': {},
        'view': {}
      };
    }
    // otherwise redirect to stats/all
    else {
      $location.url('stats/all');
    }

    $scope.isActive = function(route) {
      var field = route.split('/').join('');
      if ($scope.fields[field] && $location.path().indexOf(field) !== -1 ) {
        return route;
      } else {
        return null;
      }
    };
  });
