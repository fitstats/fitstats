'use strict';

angular.module('fitStatsApp')

  /* PARENT CONTROLLER OF DASHBOARD */

  .controller('DashboardCtrl', function ($scope, $filter, DashboardFactory, $stateParams, $state, $http, $timeout, DashboardDateFactory) {

    /* holds date's field data in filtered format (for html serving) */
    $scope.currentDay = {};

    /***
     * unfiltered version of $scope.currentDay ...
     * These matches the input models, pre-populates the submittion field where data exists
     * ensures data is submitted to db without filters
     */
    $scope.formData = {};

    /***
     * formDataClone -> used in FoodController.submitAll() to identify which fields have been altered
     * calories || (protein, carbs, fat) fields
     */
    $scope.formDataClone = {};

    /* stores which inputs are in active states ( if (inputModes[field]) { dom input === visible } */
    $scope.inputModes = {};

    /***
     * When a child controller's field value has been updated
     * loadViewItem -> updates all the value formats linked to that field.
     * This callback makes a child scope accessible within DashboardFactory's GET PUSH success responses
     */
    $scope.loadViewItem = function(data, field) {
      $scope.formDataClone[field] = data;
      $scope.formData[field] = data;

      var decimals = (field === 'weight' || field === 'bf') ? 1 : 0;
      $scope.currentDay[field] = $filter('number')(data, decimals);

      if (field === 'bps' || field === 'bpd') {
        $scope.inputModes.bp = false;
      } else if (field === 'calories' || field === 'protein' || field === 'cabs' || field === 'fat') {
        $scope.inputModes.nutrition = false;
        $scope.chartUpdate();
      } else {
        $scope.inputModes[field] = false;
      }
    };


    /* retrieveWholeDaysStats -> connected to findCurrentDate - run on every new page loads*/
    $scope.retrieveWholeDaysStats = function () {
      DashboardFactory.retrieveDayStats($scope.loadViewItem, $scope.urlDate);
    };


    $scope.updateDateContext = function (title, date, rawDate, urlDate) {
      $scope.mainTitle = title;
      $scope.date = date;
      DashboardFactory.rawDate = rawDate;
      $scope.urlDate = urlDate;

      $scope.retrieveWholeDaysStats();
    };

    /* executes when a dashboard page first loads / is refreshed
     * sets the view context to the expected date as defined by the url or date reference in DashboardFactory */
    DashboardDateFactory.findCurrentDate($scope.updateDateContext);


    $scope.nextDay = DashboardDateFactory.nextDay;

    $scope.previousDay = DashboardDateFactory.previousDay;

    $scope.resetDate = DashboardDateFactory.resetDate;


    /* Used by all child controllers */
    $scope.edit = function(field) {
      $scope.inputModes[field] = true;
    };

    /* Used by all child controllers */
    $scope.submit = function(value, field) {
      DashboardFactory.updateDatabase(value, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputModes[field] = false;
    };


    /* getMfpData -> Scrapes data from user's MFP's account for current date */
    $scope.getMfpData = function() {
      DashboardFactory.fetchMfpData($scope.loadViewItem, $scope.urlDate);
    };


    /***
     * Originally located in the nutrition panel - ∆ would not update after MFP data scraping
     * unless invoked following data updating within loadViewItem().
     * Moved here as parent controller does not have access to children scopes.
     */
    $scope.chartUpdate = function() {
      $scope.nutritionChart = {};

      $scope.nutritionChart.data = {
        'cols': [
          {id: 'n', label: 'nutrient', type: 'string'},
          {id: 'a', label: 'amount', type: 'number'}
        ],
        'rows': [
          {c: [{v: 'Protein'}, {v: $scope.formData.protein}]},
          {c: [{v: 'Carbs'}, {v: $scope.formData.carbs}]},
          {c: [{v: 'Fat'}, {v: $scope.formData.fat}]}
        ]
      };
      
      $scope.nutritionChart.cssStyle = 'margin: 0 auto; padding: 10px 10px 10px 10px;';
      $scope.nutritionChart.type = 'PieChart';
      $scope.nutritionChart.options = {
        colors: ['#61ce5c', '#59c2e6', '#d57272'],
        chartArea: {left: 0, bottom: 10, width: '100%', height: '100%'},
        width: 260,
        fontName: 'Cabin',
        pieSliceText: 'label',
        legend: {position: 'none'}

      };
      $scope.nutritionChart.displayed = true;
    };

    $timeout(function(){
      $scope.chartUpdate();
    }, 500);

  })



  /* CHILDREN CONTROLLERS: One per input form */
  .controller('WeightController', function($scope) {
    $scope.inputModes.weight = $scope.currentDay.weight ? false : true;
  })


  .controller('BFController', function($scope) {
    $scope.inputModes.bf = $scope.currentDay.bf ? false : true;
  })


  .controller('HRController', function($scope) {
    $scope.inputModes.hr = $scope.currentDay.hr ? false : true;
  })


  .controller('BPController', function($scope, DashboardFactory) {
    $scope.inputModes.bp = $scope.currentDay.bps || $scope.currentDay.bpd ? false : true;      // ∆ do we need to check for both ???

    $scope.submitBoth = function () {
      $scope.inputModes.bp = false;

      DashboardFactory.updateDatabase( {
        bps: $scope.formData.bps,
        bpd: $scope.formData.bpd
      }, 'multifields', $scope.loadViewItem, $scope.urlDate);
    };

  })



  .controller('FoodController', function($scope, $timeout, DashboardFactory) {
    $scope.inputModes.nutrition = $scope.currentDay.calories || ($scope.currentDay.protein || $scope.currentDay.carbs || $scope.currentDay.fat) ? false : true;

    $scope.submitAll = function() {
      $scope.inputModes.nutrition = false;

      if ($scope.formData.calories !== $scope.formDataClone.calories &&
      ($scope.formData.protein === $scope.formDataClone.protein ||
      $scope.formData.carbs === $scope.formDataClone.carbs ||
      $scope.formData.fat === $scope.formDataClone.fat ) ) {

        $scope.formData.protein = 0;
        $scope.formData.carbs = 0;
        $scope.formData.fat = 0;

      } else {
        $scope.formData.calories =  (Number($scope.formData.protein) * 4) +
                                    (Number($scope.formData.carbs) * 4) +
                                    (Number($scope.formData.fat) * 9);
      }

      DashboardFactory.updateDatabase({
        calories: $scope.formData.calories,
        protein: $scope.formData.protein,
        carbs: $scope.formData.carbs,
        fat: $scope.formData.fat,
      }, 'multifields', $scope.loadViewItem, $scope.urlDate);

    };
  });
