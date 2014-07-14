'use strict';

angular.module('fitStatsApp')

  .controller('DashboardCtrl', function ($scope, Auth) {
      //user $location.path to set date
    //if location.path is "today", then take new Date() converted to YYYYMMDD

    $scope.date = new Date();
    // $scope.fbDate = $filter("date")($scope.date, 'yyyyMMdd');   // ∆ ????
    // $scope.fbDate = 20140708;
    //
    // $scope.userId = $scope.auth.user.uid;
    // $scope.user = userFb.user;
    // $scope.preload = $scope.user.dates[$scope.fbDate];
    //
    // $scope.today = syncData('users/' + $scope.userId + '/dates/' + $scope.fbDate);
  })

  //.controller('NavController', function($scope, Auth){
    // $scope.logout = function(){
    //   Auth.logout();
    // };
    // $scope.userId = Auth.getCurrentUser().name;
  //})

  .controller('WeightController', function($scope, FormFunctions){
    $scope.test = '5';
    $scope.test2 = FormFunctions.test;

    $scope.inputMode = false;
    $scope.formData = {};
    //$scope.formData.weight = $scope.preload.weight;    // ∆ scope.preload error
    $scope.formData.weight = 180;                        // added to bypass error above

    // $scope.submit = FormFunctions.submit;             // ∆ error in factory
    $scope.today = {};                                   // added to bypass error: $scope.today.weight
    $scope.submit = function (weight) {                  // added to resolve error: submit
      $scope.today.weight = weight;
      $scope.inputMode = false;
    };

    //should be refactored into separate factory
    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })

  .controller('BFController', function($scope, FormFunctions){     // ∆ removed $rootScope
    $scope.inputMode = false;
    $scope.formData = {};
    // $scope.formData.bf = $scope.preload.bf;            // ∆ scope.preload error
    $scope.formData.bf = 4.5;                             // added to bypass error above

    // $scope.submit = FormFunctions.submit;             // ∆ error in factory
    $scope.today = {};                                   // added to bypass error: $scope.today.bf
    $scope.submit = function (bf) {                      // added to resolve error: submit
      $scope.today.bf = bf;
      $scope.inputMode = false;
    };

    //should be refactored into separate factory
    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })

  .controller('HRController', function($scope, FormFunctions){    // ∆ removed $rootScope
    $scope.inputMode = false;
    $scope.formData = {};
    // $scope.formData.hr = $scope.preload.hr;             // ∆ scope.preload error
    $scope.formData.hr = 100;                              // added to bypass error above

    // $scope.submit = FormFunctions.submit;               // ∆ error in factory
    $scope.today = {};                                     // added to bypass error: $scope.today.hr
    $scope.submit = function (hr) {                        // added to resolve error: submit
      $scope.today.hr = hr;
      $scope.inputMode = false;
    };

    //should be refactored into separate factory
    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })

  .controller('BPController', function($scope, FormFunctions){    // ∆ removed $rootScope
    $scope.inputMode = false;
    $scope.formData = {};
    // $scope.formData.bps = $scope.preload.bps;           // ∆ scope.preload error
    $scope.formData.bps = 120;
    // $scope.formData.bpd = $scope.preload.bpd;           // ∆ scope.preload error
    $scope.formData.bpd = 80;

    // $scope.submit = FormFunctions.submit;               // ∆ error in factory
    // $scope.submitBoth = function(){                     // ∆ error in factory
    //   $scope.submit($scope.formData.bps, "bps", 0);
    //   $scope.submit($scope.formData.bpd, 'bpd', 0);
    // };
    $scope.today = {};                                     // added to bypass error: $scope.today.hr
    $scope.submitBoth = function () {                      // added to resolve error: submit
      $scope.today.bps = $scope.formData.bps;
      $scope.today.bpd = $scope.formData.bpd;
      $scope.inputMode = false;
    }

    //should be refactored into separate factory
    $scope.edit = function(){
      $scope.inputMode = true;
    };
  })

  .controller('FoodController', function($scope, $timeout, FormFunctions){ // ∆ removed $rootScope
    $scope.inputMode = false;
    $scope.formData = {};
    // $scope.formData.calories = $scope.preload.calories;  // ∆ scope.preload error
    // $scope.formData.protein = $scope.preload.protein;    // ∆ scope.preload error
    // $scope.formData.carbs = $scope.preload.protein;      // ∆ scope.preload error
    // $scope.formData.fat = $scope.preload.fat;            // ∆ scope.preload error
    $scope.formData.calories = 0;
    $scope.formData.protein = 180;
    $scope.formData.carbs = 335;
    $scope.formData.fat = 65;
    //console.log($scope.preload);

    // $scope.submit = FormFunctions.submit;                  // ∆ error in factory
    // $scope.submitAll = function(){
    //   $scope.submit($scope.formData.calories, 'calories', 0);
    //   $scope.submit($scope.formData.protein, 'protein', 0);
    //   $scope.submit($scope.formData.carbs, 'carbs', 0);
    //   $scope.submit($scope.formData.fat, 'fat', 0);
    // };
    $scope.today = {};                                         // added to bypass error: $scope.today...
    $scope.submitAll = function(){                             // added to resolve $scope.submit error above
      $scope.today.calories = $scope.formData.calories;
      $scope.today.protein = $scope.formData.protein;
      $scope.today.carbs = $scope.formData.carbs;
      $scope.today.fat = $scope.formData.fat;
      $scope.inputMode = false;
    };

    //should be refactored into separate factory
    $scope.edit = function(){
      $scope.inputMode = true;
    };

    $scope.chartUpdate = function(){
      $scope.macroNutrientData = [
          { key: "Protein",
            y: $scope.formData.protein
          },
          {
            key: "Carbs",
             y: $scope.formData.carbs
          },
          {
            key: "Fat",
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
