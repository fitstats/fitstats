'use strict';

angular.module('fitStatsApp')


  .controller('DashboardCtrl', function ($scope, $filter, FormFunctions) {
    $scope.currentDay = {};
    $scope.formData = {};

    $scope.loadViewItem = function(data, field) {
      var decimals = (field === 'weight' || field === 'bf') ? 1 : 0;

      var filteredData = $filter('number')(data, decimals);

      if (field !== 'calories') {
        $scope.currentDay[field] = filteredData;
        $scope.formData[field] = data;
      } else {
        $scope.currentDay[field] = data;
      }
    };

    $scope.submit = function(weight, field) {
      FormFunctions.submitFieldValue(weight, field, $scope.loadViewItem, $scope.date);
      $scope.inputMode = false;
    };

    $scope.rawDate = new Date();
    $scope.date = $filter('date')($scope.rawDate, 'yyyyMMdd');

    // 1) get $stateParams.date -> assign to currentDay's date.

    // 2) get object of data for * this user & * this date.

    // 3) be able to change the date.

    // basics shared across all the fields.

    $scope.nextDay = function () {
    };

    $scope.previousDay = function() {
    };
    // ??? user $location.path to set date   // ??? if location.path is "currentDay", then take new Date() converted to YYYYMMDD
  })



  .controller('WeightController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    FormFunctions.retrieveOneStat('weight', $scope.loadViewItem, $scope.date);

    $scope.submit = function(weight, field) {
      FormFunctions.submitFieldValue(weight, field, $scope.loadViewItem, $scope.date);
      $scope.inputMode = false;
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('BFController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    FormFunctions.retrieveOneStat('bf', $scope.loadViewItem, $scope.date);

    $scope.submit = function (bf, field) {
      FormFunctions.submitFieldValue(bf, field, $scope.loadViewItem, $scope.date);
      $scope.inputMode = false;
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('HRController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    FormFunctions.retrieveOneStat('hr', $scope.loadViewItem, $scope.date);

    $scope.submit = function (hr, field) {
      FormFunctions.submitFieldValue(hr, field, $scope.loadViewItem, $scope.date);
      $scope.inputMode = false;
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('BPController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    FormFunctions.retrieveOneStat('bps', $scope.loadViewItem, $scope.date);
    FormFunctions.retrieveOneStat('bpd', $scope.loadViewItem, $scope.date);

    $scope.submitBoth = function () {
      $scope.currentDay.bps = $scope.formData.bps;
      $scope.currentDay.bpd = $scope.formData.bpd;
      $scope.inputMode = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.bps, 'bps', $scope.loadViewItem, $scope.date ],
        [ $scope.formData.bpd, 'bpd', $scope.loadViewItem, $scope.date ]
      ]);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('FoodController', function($scope, $timeout, FormFunctions) {
    $scope.inputMode = false;

    FormFunctions.retrieveOneStat('calories', $scope.loadViewItem, $scope.date);
    FormFunctions.retrieveOneStat('protein', $scope.loadViewItem, $scope.date);
    FormFunctions.retrieveOneStat('carbs', $scope.loadViewItem, $scope.date);
    FormFunctions.retrieveOneStat('fat', $scope.loadViewItem, $scope.date);

    $scope.submitAll = function() {
      var calories =  (Number($scope.formData.protein) * 4) +
                      (Number($scope.formData.carbs) * 4) +
                      (Number($scope.formData.fat) * 9);
      $scope.formData.calories = $scope.formData.calories || calories;
      $scope.inputMode = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.calories, 'calories', $scope.loadViewItem, $scope.date ],
        [ $scope.formData.protein, 'protein', $scope.loadViewItem, $scope.date],
        [ $scope.formData.carbs, 'carbs', $scope.loadViewItem, $scope.date ],
        [ $scope.formData.fat, 'fat', $scope.loadViewItem, $scope.date ]
      ]);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };

    $scope.chartUpdate = function(){
      $scope.macroNutrientData = [
          { key: 'Protein',
            y: $scope.formData.protein
          },
          {
            key: 'Carbs',
             y: $scope.formData.carbs
          },
          {
            key: 'Fat',
             y: $scope.formData.fat
          }
      ];

      var colorArray = ['#61ce5c', '#59c2e6', '#d57272'];
      $scope.colorFunction = function() {
        return function(d, i) {
            return colorArray[i];
          };
      };

      $scope.xFunction = function(){
          return function(d) {
              return d.key;
          };
      };

      $scope.yFunction = function(){
          return function(d) {
              return d.y;
          };
      };

      $scope.descriptionFunction = function(){
          return function(d){
              return d.key;
          };
      };
    };

    $timeout(function(){
      $scope.chartUpdate();
    }, 500);

  });
