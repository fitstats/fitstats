'use strict';

angular.module('fitStatsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.chartObject = {
      "type": "LineChart",
      "displayed": true,
      "data": {
        "cols": [
          {
            "id": "month",
            "label": "Month",
            "type": "string",
            "p": {}
          },
          {
            "id": "laptop-id",
            "label": "Weight",
            "type": "number",
            "p": {}
          }
        ],
        "rows": [
          {
            "c": [
              {
                "v": "7-13"
              },
              {
                "v": 175.0,
                "f": "175.0 lbs"
              }
            ]
          },
          {
            "c": [
              {
                "v": "7-14"
              },
              {
                "v":175.2,
                "f": "175.2 lbs"
              }
            ]
          },
          {
            "c": [
              {
                "v": "7-15"
              },
              {
                "v": 174.6,
                "f": "174.6 lbs"
              }
            ]
          },
          {
            "c": [
              {
                "v": "7-16"
              },
              {
                "v": 174.2,
                "f": "174.2 lbs"
              }
            ]
          },
          {
            "c": [
              {
                "v": "7-17"
              },
              {
                "v": 174.6,
                "f": "174.6 lbs"
              }
            ]
          },
          {
            "c": [
              {
                "v": "7-18"
              },
              {
                "v": 173.8,
                "f": "173.8 lbs"
              }
            ]
          }
        ]
      },
      "options": {
        "title": "Weight Loss Over Time",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          // "title": "Weight",
          "gridlines": {
            "count": 10
          }
        },
        "hAxis": {
          // "title": "Date"
        }
      },
      "formatters": {},
      "view": {}
    }
  });
