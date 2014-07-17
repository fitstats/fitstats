'use strict';

angular.module('fitStatsApp')


  .controller('DashboardCtrl', function ($scope, $filter, FormFunctions, Auth) {

    $scope.getDate = function () {
      if (FormFunctions.rawDate) {
        $scope.date = FormFunctions.rawDate;
      } else {
        FormFunctions.rawDate = new Date();
        $scope.date = FormFunctions.rawDate;
        FormFunctions.date = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');
      }
    };
    $scope.getDate();

    $scope.nextDay = function () {
      // FormFunctions.rawDate++;
      // FormFunctions.date++;
    };

    $scope.previousDay = function() {
    };

    // ??? user $location.path to set date
    // ??? if location.path is "today", then take new Date() converted to YYYYMMDD
  })



  .controller('WeightController', function($scope, FormFunctions) {
    $scope.today = {};
    $scope.formData = {};
    $scope.inputMode = false;

    $scope.loadViewItem = function(data, field) {
      $scope.today[field] = data;
      $scope.formData[field] = data;
      $scope.inputMode = false;
    }
    FormFunctions.retrieveOneStat('weight', $scope.loadViewItem);

    $scope.submit = function(weight, field, decimals) {
      FormFunctions.submitFieldValue(weight, field, decimals, $scope.loadViewItem);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('BFController', function($scope, FormFunctions) {
    $scope.today = {};
    $scope.formData = {};
    $scope.inputMode = false;

    $scope.loadViewItem = function(data, field) {
      $scope.today[field] = data;
      $scope.formData[field] = data;
      $scope.inputMode = false;
    }
    FormFunctions.retrieveOneStat('bf', $scope.loadViewItem);

    $scope.submit = function (bf, field, decimals) {
      FormFunctions.submitFieldValue(bf, field, decimals, $scope.loadViewItem);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('HRController', function($scope, FormFunctions) {
    $scope.today = {};
    $scope.formData = {};
    $scope.inputMode = false;

    $scope.loadViewItem = function(data, field) {
      $scope.today[field] = data;
      $scope.formData[field] = data;
      $scope.inputMode = false;
    }
    FormFunctions.retrieveOneStat('hr', $scope.loadViewItem);

    $scope.submit = function (hr, field, decimals) {
      FormFunctions.submitFieldValue(hr, field, decimals, $scope.loadViewItem);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('BPController', function($scope, FormFunctions) {
    $scope.today = {};
    $scope.formData = {};
    $scope.inputMode = false;

    $scope.loadViewItem = function(data, field) {
      $scope.today[field] = data;
      $scope.formData[field] = data;
      $scope.inputMode = false;
    }
    FormFunctions.retrieveOneStat('bps', $scope.loadViewItem);
    FormFunctions.retrieveOneStat('bpd', $scope.loadViewItem);

    $scope.submitBoth = function (decimals) {
      $scope.today.bps = $scope.formData.bps;
      $scope.today.bpd = $scope.formData.bpd;
      $scope.inputMode = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.bps, 'bps', decimals, $scope.loadViewItem ],
        [ $scope.formData.bpd, 'bpd', decimals, $scope.loadViewItem ]
      ], FormFunctions);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('FoodController', function($scope, $timeout, FormFunctions) {
    $scope.today = {};
    $scope.formData = {};
    $scope.inputMode = false;

    $scope.loadViewItem = function(data, field) {
      $scope.today[field] = data;
      $scope.formData[field] = data;
      $scope.inputMode = false;
    }
    FormFunctions.retrieveOneStat('calories', $scope.loadViewItem);
    FormFunctions.retrieveOneStat('protein', $scope.loadViewItem);
    FormFunctions.retrieveOneStat('carbs', $scope.loadViewItem);
    FormFunctions.retrieveOneStat('fat', $scope.loadViewItem);

    $scope.submitAll = function(decimals) {
      var calories = Number($scope.formData.protein) + Number($scope.formData.carbs) + Number($scope.formData.fat);
      $scope.formData.calories = $scope.formData.calories || calories;


      FormFunctions.submitMultipleFields([
        [ $scope.formData.calories, 'calories', decimals, $scope.loadViewItem ],
        [ $scope.formData.protein, 'protein', decimals, $scope.loadViewItem],
        [ $scope.formData.carbs, 'carbs', decimals, $scope.loadViewItem ],
        [ $scope.formData.fat, 'fat', decimals, $scope.loadViewItem ]
      ], FormFunctions);
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
