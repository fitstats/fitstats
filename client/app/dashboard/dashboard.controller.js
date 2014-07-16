'use strict';

angular.module('fitStatsApp')


  .controller('DashboardCtrl', function ($scope, Auth) {
    // user $location.path to set date ???
    // if location.path is "today", then take new Date() converted to YYYYMMDD
    $scope.date = new Date();   // ∆ set to current day only.

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
    FormFunctions.retrieve('weight', $scope.loadViewItem);

    $scope.submit = function(weight, field, decimals) {
      FormFunctions.submit(weight, field, decimals, $scope.loadViewItem);
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
    FormFunctions.retrieve('bf', $scope.loadViewItem);

    $scope.submit = function (bf, field, decimals) {
      FormFunctions.submit(bf, field, decimals, $scope.loadViewItem);
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
    FormFunctions.retrieve('hr', $scope.loadViewItem);

    $scope.submit = function (hr, field, decimals) {
      FormFunctions.submit(hr, field, decimals, $scope.loadViewItem);
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
    FormFunctions.retrieve('bps', $scope.loadViewItem);
    FormFunctions.retrieve('bpd', $scope.loadViewItem);

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
    FormFunctions.retrieve('calories', $scope.loadViewItem);
    FormFunctions.retrieve('protein', $scope.loadViewItem);
    FormFunctions.retrieve('carbs', $scope.loadViewItem);
    FormFunctions.retrieve('fat', $scope.loadViewItem);

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
