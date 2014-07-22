'use strict';

angular.module('fitStatsApp')
  .controller('StatsCtrl', function ($scope, $stateParams, $location, StatsFactory) {

  //todo: replace chartData with live data from server instead of prefilled data
  //expect database helper method to retrieve data in the following format:
  // for 'weight' request, {7-14: 175.2}
  // for 'bf' request, {7-14: 13.2}
  // etc...

  //In stats.service.js file, function retrieveSevenDaysStats() will fetch data
  //from database according to date and fields 

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
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Body Fat (%)', type: 'number', p: {} }
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
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Heart Rate (BPM)', type: 'number', p: {} }
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
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Systolic (mmHg)', type: 'number', p: {} },
            { id: 'field-id', label: 'Diastolic (mmHg)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 130, 'f': '130 mmHg'}, {'v': 85, 'f': '85 mmHg'} ] },
            {'c': [ {'v': '7-14'}, {'v': 125, 'f': '125 mmHg'}, {'v': 75, 'f': '85 mmHg'} ] },
            {'c': [ {'v': '7-15'}, {'v': 125, 'f': '125 mmHg'}, {'v': 80, 'f': '85 mmHg'} ] },
            {'c': [ {'v': '7-16'}, {'v': 130, 'f': '130 mmHg'}, {'v': 85, 'f': '85 mmHg'} ] },
            {'c': [ {'v': '7-17'}, {'v': 125, 'f': '125 mmHg'}, {'v': 75, 'f': '85 mmHg'} ] },
            {'c': [ {'v': '7-18'}, {'v': 120, 'f': '120 mmHg'}, {'v': 70, 'f': '85 mmHg'} ] }
          ]
        }
      },
      'calories': {
        chartTitle: 'Calories Consumed Over Time',
        chartLabel: 'Calories (kcal)',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Calories (kcal)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 2400, 'f': '2,400 kcal'} ] },
            {'c': [ {'v': '7-14'}, {'v': 2350, 'f': '2,350 kcal'} ] },
            {'c': [ {'v': '7-15'}, {'v': 2450, 'f': '2,450 kcal'} ] },
            {'c': [ {'v': '7-16'}, {'v': 2000, 'f': '2,000 kcal'} ] },
            {'c': [ {'v': '7-17'}, {'v': 2700, 'f': '2,700 kcal'} ] },
            {'c': [ {'v': '7-18'}, {'v': 2300, 'f': '2,300 kcal'} ] }
          ]
        }
      },
      'protein': {
        chartTitle: 'Protein Consumed Over Time',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Protein (g)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 160, 'f': '160 grams'} ] },
            {'c': [ {'v': '7-14'}, {'v': 150, 'f': '150 grams'} ] },
            {'c': [ {'v': '7-15'}, {'v': 155, 'f': '155 grams'} ] },
            {'c': [ {'v': '7-16'}, {'v': 140, 'f': '140 grams'} ] },
            {'c': [ {'v': '7-17'}, {'v': 158, 'f': '158 grams'} ] },
            {'c': [ {'v': '7-18'}, {'v': 165, 'f': '165 grams'} ] }
          ]
        }
      },
      'carbs': {
        chartTitle: 'Carbs Consumed Over Time',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Carbs (g)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 160, 'f': '160 grams'} ] },
            {'c': [ {'v': '7-14'}, {'v': 150, 'f': '150 grams'} ] },
            {'c': [ {'v': '7-15'}, {'v': 155, 'f': '155 grams'} ] },
            {'c': [ {'v': '7-16'}, {'v': 140, 'f': '140 grams'} ] },
            {'c': [ {'v': '7-17'}, {'v': 158, 'f': '158 grams'} ] },
            {'c': [ {'v': '7-18'}, {'v': 165, 'f': '165 grams'} ] }
          ]
        }
      },
      'fat': {
        chartTitle: 'Fat Consumed Over Time',
        chartData: {
          cols: [
            { id: 'month', label: 'Month', type: 'string', p: {} },
            { id: 'field-id', label: 'Fat (g)', type: 'number', p: {} }
          ],
          rows: [
            {'c': [ {'v': '7-13'}, {'v': 160, 'f': '160 grams'} ] },
            {'c': [ {'v': '7-14'}, {'v': 150, 'f': '150 grams'} ] },
            {'c': [ {'v': '7-15'}, {'v': 155, 'f': '155 grams'} ] },
            {'c': [ {'v': '7-16'}, {'v': 140, 'f': '140 grams'} ] },
            {'c': [ {'v': '7-17'}, {'v': 158, 'f': '158 grams'} ] },
            {'c': [ {'v': '7-18'}, {'v': 165, 'f': '165 grams'} ] }
          ]
        }
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
