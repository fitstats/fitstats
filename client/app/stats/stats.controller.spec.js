// 'use strict';
//
// describe('Controller: StatsCtrl', function () {
//
//   // load the controller's module
//   beforeEach(module('fitStatsApp'));
//
//   var StatsCtrl, scope;
//
//   // Initialize the controller and a mock scope
//   beforeEach(inject(function ($controller, $rootScope) {
//     scope = $rootScope.$new();
//     StatsCtrl = $controller('DashboardCtrl', {
//       $scope: scope
//     });
//   }));
//
//   it('should ...', function () {
//     expect('Sample Test').toEqual('Sample Test');
//   });
// });

describe('Controller: StatsCtrl', function () {

  var createController;
  var scope;

  beforeEach(module('fitStatsApp'));

  beforeEach(inject(function ($injector, $controller, $rootScope) {

    scope = $rootScope.$new();

    createController = function (stateParams) {
      return $controller('StatsCtrl', {
        $scope: scope,
        $stateParams: stateParams || {}
      });
    }

  }));

  it('creates scope.fields', function () {
    var controller = createController();
    expect(scope.fields).not.toBe(undefined);
  });

  it('builds a chart object if scope.fields[stateParams.field] matches a field', function () {
    var controller = createController({field: 'fat'});
    expect(scope.chartTitle).toEqual('Fat Consumed Over Time');
    expect(scope.googleChart).not.toBe(undefined);
  });

  it()

});