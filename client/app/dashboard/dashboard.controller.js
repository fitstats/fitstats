'use strict';

angular.module('fitStatsApp')

  .controller('DashboardCtrl', function ($scope, $http, $filter, FormFunctions, $stateParams, $state) {

    /* $scope.currentDay = Object with all current Day's data - in filtered format */
    $scope.currentDay = {};
    /* $scope.formData = pre-built submittion data - in raw format */
    $scope.formData = {};
    /* stores which inputs are in active ( true = visible) states */
    $scope.inputModes = {};

    $scope.getMfpData = function() {
      var mfpUserId = window.prompt('What is is your MFP user ID?');
      return $http.get('/api/mfp/' + mfpUserId + '/' + $scope.urlDate)
      .success( function(data) {
        if (data.data.calories || data.data.protein || data.data.carbs || data.data.fat) {
          $scope.formData.calories =  ( (Number(data.data.protein) * 4) +
                                      (Number(data.data.carbs) * 4) +
                                      (Number(data.data.fat) * 9) ) || undefined;

          $scope.formData.protein = data.data.protein || undefined;
          $scope.formData.carbs = data.data.carbs || undefined;
          $scope.formData.fat = data.data.fat || undefined;

          FormFunctions.submitMultipleFields([
            [ data.data.calories, 'calories', $scope.loadViewItem, $scope.urlDate ],
            [ data.data.protein, 'protein', $scope.loadViewItem, $scope.urlDate],
            [ data.data.carbs, 'carbs', $scope.loadViewItem, $scope.urlDate ],
            [ data.data.fat, 'fat', $scope.loadViewItem, $scope.urlDate ]
          ]);
        } else { debugger; };

      });
    };

    $scope.loadViewItem = function(data, field) {
      var decimals = (field === 'weight' || field === 'bf') ? 1 : 0;
      var filteredData = $filter('number')(data, decimals);
      $scope.currentDay[field] = filteredData;

      if (field === 'bps' || field === 'bpd'){
        $scope.inputModes.bp = false;
      } else if (field === 'calories' || field === 'protein' || field === 'cabs' || field === 'fat') {
        $scope.inputModes.nutrition = false;
      } else {
        $scope.inputModes[field] = false;
      };
    };

    $scope.retrieveWholeDaysStats = function () {
      //var userId = FormFunctions.userId;
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

    $scope.findCurrentDate = function () {

      if ($stateParams.date === 'today') {
        /**
         * Set the date to present,
         * clone it into Factory for a reference;
         * and align the query date
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
         *
         */
        var currentCalendarDay =  $filter('date')(new Date(), 'yyyyMMdd');
        var dateToDisplay = $filter('date')(FormFunctions.rawDate, 'yyyyMMdd');

        $scope.mainTitle = currentCalendarDay === dateToDisplay  ? 'Today':'Date';
        $scope.date = FormFunctions.rawDate;
        $scope.urlDate = $stateParams.date;
        $scope.retrieveWholeDaysStats();

      } else if (!isNaN(Number($stateParams.date) %1)) {
        /**
        * For when the page is reloaded by client.
        */
        var presentDate = new Date();
        var presentDateFiltered = $filter('date')(presentDate, 'yyyyMMdd');;
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

    $scope.edit = function(field) {
      $scope.inputModes[field] = true;
    };

  })



  .controller('WeightController', function($scope, FormFunctions) {
    $scope.inputModes.weight = $scope.currentDay.weight ? false : true;

    $scope.submit = function(weight, field) { debugger;
      FormFunctions.submitFieldValue(weight, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputModes.weight = false;
    };

  })



  .controller('BFController', function($scope, FormFunctions) {
    $scope.inputModes.bf = $scope.currentDay.bf ? false : true;

    $scope.submit = function (bf, field) {
      FormFunctions.submitFieldValue(bf, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputModes.bf = false;
    };

  })



  .controller('HRController', function($scope, FormFunctions) {
    $scope.inputModes.hr = $scope.currentDay.hr ? false : true;

    $scope.submit = function (hr, field) {
      FormFunctions.submitFieldValue(hr, field, $scope.loadViewItem, $scope.urlDate);
      $scope.inputModes.hr = false;
    };

  })



  .controller('BPController', function($scope, FormFunctions) {
    $scope.inputModes.bp = $scope.currentDay.bps || $scope.currentDay.bpd ? false : true;      // ∆ check for both ???

    $scope.submitBoth = function () {
      $scope.currentDay.bps = $scope.formData.bps;
      $scope.currentDay.bpd = $scope.formData.bpd;
      $scope.inputModes.bp = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.bps, 'bps', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.bpd, 'bpd', $scope.loadViewItem, $scope.urlDate ]
      ]);
    };

  })



  .controller('FoodController', function($scope, $timeout, FormFunctions) {
    $scope.inputModes.nutrition = $scope.currentDay.calories || ($scope.currentDay.protein || $scope.currentDay.carbs || $scope.currentDay.fat) ? false : true;

    $scope.submitAll = function() { debugger;

      if ( !$(foodForm.calories).hasClass('ng-pristine') && $(foodForm.protein).hasClass('ng-pristine') && $(foodForm.carbs).hasClass('ng-pristine') && $(foodForm.fat).hasClass('ng-pristine')) {
        $scope.formData.protein = 0;
        $scope.formData.carbs = 0;
        $scope.formData.fat = 0;
      } else if ( !$(foodForm.protein).hasClass('ng-pristine') || !$(foodForm.carbs).hasClass('ng-pristine') || !$(foodForm.fat).hasClass('ng-pristine')) {
        $scope.formData.calories =  (Number($scope.formData.protein) * 4) +
                                    (Number($scope.formData.carbs) * 4) +
                                    (Number($scope.formData.fat) * 9);
      }
      $scope.inputModes.nutrition = false;

      FormFunctions.submitMultipleFields([
        [ $scope.formData.calories, 'calories', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.protein, 'protein', $scope.loadViewItem, $scope.urlDate],
        [ $scope.formData.carbs, 'carbs', $scope.loadViewItem, $scope.urlDate ],
        [ $scope.formData.fat, 'fat', $scope.loadViewItem, $scope.urlDate ]
      ]);

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
