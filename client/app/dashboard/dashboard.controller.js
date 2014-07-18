'use strict';

angular.module('fitStatsApp')


  .controller('DashboardCtrl', function ($scope, $filter, FormFunctions, $stateParams, $state) {
    // object with all current Day's data - in filtered format:
    $scope.currentDay = {};
    // pre-built submittion data - in raw format:
    $scope.formData = {};
    //$scope.queriedDay = {};

    $scope.loadViewItem = function(data, field) {
      var decimals = (field === 'weight' || field === 'bf') ? 1 : 0;
      var filteredData = $filter('number')(data, decimals);
      $scope.currentDay[field] = filteredData;
    };

    $scope.retrieveWholeDaysStats = function () {

      FormFunctions.retrieveDayStats()
        .get({ id: FormFunctions.userId, date: $scope.urlDate})
        .$promise.then(function(response) {
            console.log('**Data successfully retrieved:', response.data);

              $scope.formData = response.data;
              _.forEach($scope.formData, function (singleData, field) {
                $scope.loadViewItem(singleData, field);
              });
        });
    };

    $scope.findCurrentDate = function () {
      if ($stateParams.date === 'today') {
        // set the date to present,
        // clone it into Factory for a reference;
        // and align the query date
        $scope.mainTitle = 'Today';
        $scope.date = new Date();
        FormFunctions.rawDate = $scope.date;
        $scope.urlDate = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');
        $scope.retrieveWholeDaysStats();
      } else if (FormFunctions.rawDate) {
        // set the date to the stored raw reference;
        // and align the query date
        var currentCalendarDay =  $filter('date')(new Date(), 'yyyyMMdd');
        var dateToDisplay = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');
        $scope.mainTitle = currentCalendarDay === dateToDisplay  ? 'Today':'Date';
        $scope.date = FormFunctions.rawDate;
        $scope.urlDate = $stateParams.date;
        $scope.retrieveWholeDaysStats();
      } else {
        $state.go('dashboard', {date: 'today'} );
      }
    };
    $scope.findCurrentDate();

    $scope.nextDay = function () {
      FormFunctions.rawDate.setDate(FormFunctions.rawDate.getDate() + 1);
      var newUrlState = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');
      $state.go('dashboard', {date: newUrlState} );
    };

    $scope.previousDay = function() {
      FormFunctions.rawDate.setDate(FormFunctions.rawDate.getDate() - 1);
      var newUrlState = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');
      $state.go('dashboard', {date: newUrlState} );
    };

    $scope.resetDate = function () {
      $state.go('dashboard', {date: 'today'} );
    };

  })



  .controller('WeightController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    $scope.submit = function(weight, field) {
      FormFunctions.submitFieldValue(weight, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputMode = false;
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('BFController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    $scope.submit = function (bf, field) {
      FormFunctions.submitFieldValue(bf, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputMode = false;
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('HRController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    $scope.submit = function (hr, field) {
      FormFunctions.submitFieldValue(hr, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputMode = false;
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('BPController', function($scope, FormFunctions) {
    $scope.inputMode = false;

    $scope.submitBoth = function () {
      $scope.currentDay.bps = $scope.formData.bps;
      $scope.currentDay.bpd = $scope.formData.bpd;
      $scope.inputMode = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.bps, 'bps', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.bpd, 'bpd', $scope.loadViewItem, $scope.urlDate ]
      ]);
    };

    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })



  .controller('FoodController', function($scope, $timeout, FormFunctions) {
    $scope.inputMode = false;

    $scope.submitAll = function() {
      if ($scope.formData.protein || $scope.formData.carbs || $scope.formData.fats) {
        $scope.formData.calories =  (Number($scope.formData.protein) * 4) +
                                    (Number($scope.formData.carbs) * 4) +
                                    (Number($scope.formData.fat) * 9);
      }
      $scope.inputMode = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.calories, 'calories', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.protein, 'protein', $scope.loadViewItem, $scope.urlDate],
        [ $scope.formData.carbs, 'carbs', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.fat, 'fat', $scope.loadViewItem, $scope.urlDate ]
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
