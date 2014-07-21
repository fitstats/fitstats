'use strict';

angular.module('fitStatsApp')

  /* PARENT CONTROLLER OF DASHBOARD */
  .controller('DashboardCtrl', function ($scope, $filter, FormFunctions, $stateParams, $state, $http, $timeout) {

    /* $scope.currentDay -> how a date's data is presented to the user (filtered format) */
    $scope.currentDay = {};

    /***
     * $scope.formData -> unfiltered version of $scope.currentDay ...
     * purpose -> matches the input models
     * pre-populates the submittion field where data exists
     * ensures data is submitted to db without filters
     */
    $scope.formData = {};

    /***
     * currentDayRawClone -> used in FoodController's submitAll to identify which fields have been altered
     * calories or [ protein / carbs / fat ]
    */
    $scope.currentDayRawClone = {};

    /* inputModes -> stores which inputs are in active states ( field: true => visible) */
    $scope.inputModes = {};

    /* loadViewItem -> when a field's value has been updated - updates all the value formats linked to a field.*/
    $scope.loadViewItem = function(data, field) { debugger;
      $scope.currentDayRawClone[field] = data;
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
      FormFunctions.retrieveDayStats()
        .get({date: $scope.urlDate})
        .$promise.then(function(successResponse) {
          $scope.formData = successResponse.data || {};
          _.forEach($scope.formData, function (singleData, field) {
            $scope.loadViewItem(singleData, field);
          });
        }, function() {
          console.log('GET request fail for day: '+ $scope.urlDate);
        });
    };

    /* findCurrentDate -> executes when a dashboard page first loads / is refreshed
     * sets the view context to the expected date as defined by the url or date reference in FormFunctions
     */
    $scope.findCurrentDate = function () {

      if ($stateParams.date === 'today') {
        /**
         * Set the date to present,
         * clone it into Factory for a reference,
         * and align the date's format for database querying
         */
        $scope.mainTitle = 'Today';
        $scope.date = new Date();
        FormFunctions.rawDate = $scope.date;
        $scope.urlDate = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');
        $scope.retrieveWholeDaysStats();

      } else if (FormFunctions.rawDate instanceof Date) {
        /**
         * Set the date to the stored raw reference;
         * and align the query date
         */
        var currentCalendarDay =  $filter('date')(new Date(), 'yyyyMMdd');
        var dateToDisplay = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');

        $scope.mainTitle = currentCalendarDay === dateToDisplay  ? 'Today':'Date';
        $scope.date = FormFunctions.rawDate;
        $scope.urlDate = $stateParams.date;
        $scope.retrieveWholeDaysStats();

      } else if (!isNaN(Number($stateParams.date) %1)) {
        /**
        * For when the page is refreshed or url date is edited by client.
        */
        var presentDate = new Date();
        var presentDateFiltered = $filter('date')(presentDate, 'yyyyMMdd');
        var refreshedDate = $stateParams.date;

        if (presentDateFiltered === refreshedDate) {

          $scope.mainTitle = 'Today';
          $scope.date = presentDate;
          FormFunctions.rawDate = $scope.date;
          $scope.urlDate = refreshedDate;
          $scope.retrieveWholeDaysStats();

        } else {
          var year = refreshedDate.slice(0, 4);
          var month = (refreshedDate.slice(4, 6) -1);
          var day = refreshedDate.slice(6);

          $scope.mainTitle = 'Date';
          $scope.date = new Date(year, month, day);
          FormFunctions.rawDate = $scope.date;
          $scope.urlDate = refreshedDate;
          $scope.retrieveWholeDaysStats();
        }
      } else {
        /* if all else fails, redirect back today's context */
        $state.go('dashboard', {date: 'today'} );
      }
    };
    $scope.findCurrentDate();

    /* date changes update the factory's raw date to that expected and
     * reloads the views + controller modules in accordance */
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

    /* shared methods between child controllers */
    $scope.edit = function(field) {
      $scope.inputModes[field] = true;
    };

    $scope.submit = function(value, field) {
      FormFunctions.submitFieldValue(value, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputModes[field] = false;
    };

    /***
     * getMfpData -> Scrapes data from user's MFP's account for current date
     * ∆ should be in factory, issues with invoking submitMultipleFields followed by submitFieldValue
     * as the 'this' context gets mutated within submitFieldValuewithin following submitMultipleFields' .apply()
     */
    $scope.getMfpData = function() {
      var mfpUserId;

      if (typeof FormFunctions.mfpId.data === 'string') {
        mfpUserId = FormFunctions.mfpId.data;
      } else {
        mfpUserId = window.prompt('What is is your MFP user ID?');
      }

      $http.get('/api/mfp/' + mfpUserId + '/' + $scope.urlDate)
      .success( function(data) {
        console.log(data.data);
        if (!data.data.private) {
          if (data.data.calories || data.data.protein || data.data.carbs || data.data.fat) {

            data.calories =  ( (Number(data.data.protein) * 4) +
                                        (Number(data.data.carbs) * 4) +
                                        (Number(data.data.fat) * 9) ) || undefined;

            FormFunctions.submitMultipleFields([
              [ data.calories, 'calories', $scope.loadViewItem, $scope.urlDate ],
              [ data.data.protein, 'protein', $scope.loadViewItem, $scope.urlDate],
              [ data.data.carbs, 'carbs', $scope.loadViewItem, $scope.urlDate ],
              [ data.data.fat, 'fat', $scope.loadViewItem, $scope.urlDate ]
            ]);
          } else {
            window.alert('No data for this day');
          }
        } else {
          window.alert('This profile is private');
        }
      });
    };


    /***
     * Originally located in the nutrition panel - ∆ would not update after MFP data scrapping
     * unless invoked following data scrapping within loadViewItem.
     * Moved here as parent controller does not have access to child scope.
    */
    $scope.chartUpdate = function() {

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

  })


  /* Children Controllers: */

  .controller('WeightController', function($scope) {
    $scope.inputModes.weight = $scope.currentDay.weight ? false : true;
  })



  .controller('BFController', function($scope) {
    $scope.inputModes.bf = $scope.currentDay.bf ? false : true;
  })



  .controller('HRController', function($scope) {
    $scope.inputModes.hr = $scope.currentDay.hr ? false : true;
  })



  .controller('BPController', function($scope, FormFunctions) {
    $scope.inputModes.bp = $scope.currentDay.bps || $scope.currentDay.bpd ? false : true;      // ∆ check for both ???

    $scope.submitBoth = function () {
      $scope.inputModes.bp = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.bps, 'bps', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.bpd, 'bpd', $scope.loadViewItem, $scope.urlDate ]
      ]);
    };

  })



  .controller('FoodController', function($scope, $timeout, FormFunctions) {
    $scope.inputModes.nutrition = $scope.currentDay.calories || ($scope.currentDay.protein || $scope.currentDay.carbs || $scope.currentDay.fat) ? false : true;

    $scope.submitAll = function() {
      $scope.inputModes.nutrition = false;

      if ($scope.formData.calories !== $scope.currentDayRawClone.calories &&
      ($scope.formData.protein === $scope.currentDayRawClone.protein ||
      $scope.formData.carbs === $scope.currentDayRawClone.carbs ||
      $scope.formData.fat === $scope.currentDayRawClone.fat ) ) {

        $scope.formData.protein = 0;
        $scope.formData.carbs = 0;
        $scope.formData.fat = 0;

      } else {
        $scope.formData.calories =  (Number($scope.formData.protein) * 4) +
                                    (Number($scope.formData.carbs) * 4) +
                                    (Number($scope.formData.fat) * 9);
      }

      FormFunctions.submitMultipleFields([
        [ $scope.formData.calories, 'calories', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.protein, 'protein', $scope.loadViewItem, $scope.urlDate],
        [ $scope.formData.carbs, 'carbs', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.fat, 'fat', $scope.loadViewItem, $scope.urlDate ]
      ]);

    };
  });
