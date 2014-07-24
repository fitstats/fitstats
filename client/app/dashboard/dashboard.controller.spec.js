'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('fitStatsApp'));

  var DashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  describe('scope.loadViewItem()', function() {
    it('keeps formData and formDataClone in sync', function () {
      scope.loadViewItem('250', 'weight');
      scope.loadViewItem('15', 'bf');
      expect(JSON.stringify(scope.formData)).toEqual(JSON.stringify(scope.formDataClone));
    });

    ['weight', 'bf'].forEach( function (val) {
      it('correctly adds decimals to ' + val, function () {
        scope.loadViewItem('50', val);
        expect(scope.currentDay[val]).toEqual('50.0');
      });
    });

    ['bps', 'bpd'].forEach( function (bpType) {
      it('correctly handles ' + bpType + ' input', function () {
        scope.loadViewItem('100', bpType);
        expect(scope.inputModes.bp).toEqual(false);
      });
    });
  
    ['calories', 'protein', 'carbs', 'fat'].forEach( function (nutrient) {
      it('correctly handles ' + nutrient + ' input', function () {
        spyOn(scope, 'chartUpdate');
        scope.loadViewItem('100', nutrient);
        expect(scope.inputModes.nutrition).toEqual(false);
        expect(scope.chartUpdate).toHaveBeenCalled();
      });
    });

  });

});
