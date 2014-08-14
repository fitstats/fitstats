'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('fitStatsApp'));

  var DashboardCtrl;
  var scope;
  var DashboardFactoryMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    // DashboardFactoryMock = makeDashboardFactoryMock();
    DashboardFactoryMock = jasmine.createSpyObj('DashboardFactory', [
      "retrieveDayStats",
      "findCurrentDate",
      "updateDatabase",
      "fetchMfpData"]);
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      DashboardFactory: DashboardFactoryMock
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
      it('correctly handle™s ' + bpType + ' input', function () {
        scope.loadViewItem('100', bpType);
        expect(scope.inputModes.bp).toEqual(false);
      });
    });

    // TODO CABS
    ['calories', 'protein', 'cabs', 'fat'].forEach( function (nutrient) {
      it('correctly handles ' + nutrient + ' input', function () {
        spyOn(scope, 'chartUpdate');
        scope.loadViewItem('100', nutrient);
        expect(scope.inputModes.nutrition).toEqual(false);
        expect(scope.chartUpdate).toHaveBeenCalled();
      });
    });

  });

  describe('scope.retrieveWholeDaysStats()', function () {
    it('calls DashboardFactory.retrieveDayStats', function () {
      scope.retrieveWholeDaysStats();
      expect(DashboardFactoryMock.retrieveDayStats).toHaveBeenCalled();
    });
  });

  describe('scope.updateDateContext()', function () {
    it('sets mainTitle, date, and urlDate on scope', function () {
      scope.updateDateContext('a', 'b', '', 'c');
      expect(scope.mainTitle).toEqual('a');
      expect(scope.date).toEqual('b');
      expect(scope.urlDate).toEqual('c');
    });
    it('sets rawTitle on DashboardFactory', function() {
      scope.updateDateContext('', '', 'd', '');
      expect(DashboardFactoryMock.rawDate).toEqual('d');
    });
  });

  describe('scope.edit()', function () {
    it('sets the appropriate $scope.inputModes to true', function () {
      scope.edit('thing');
      scope.edit('otherThing');
      expect(scope.inputModes.thing).toEqual(true);
      expect(scope.inputModes.otherThing).toEqual(true);
    });
  });

  describe('scope.submit()', function () {
    it('calls DashboardFactory.updateDatabase with the correct arguments', function () {
      var cb = scope.loadViewItem;
      scope.urlDate = 'date';
      scope.submit('value', 'field');
      expect(DashboardFactoryMock.updateDatabase).toHaveBeenCalledWith('value', 'field', cb, 'date')
    });
  });

  // TODO: method name mismatch
  // getMfpData vs. fetchMfpData
  // describe('scope.getMfpData()', function () {
  //   it('calls DashboardFactory.fetchMfpData with the correct arguments', function () {
  //     var cb = scope.loadViewItem;
  //     scope.urlDate = 'date';
  //     scope.getMfpData();
  //     expect(DashboardFactoryMock.fetchMfpData).toHaveBeenCalledWith(cb, 'date');
  //   });
  // });
  //
  // describe('scope.chartUpdate()', function () {
  //   it('builds scope.macroNutrientData from scope.formData', function () {
  //     scope.formData = {
  //       protein: "100",
  //       carbs: "200",
  //       fat: "300"
  //     };
  //     scope.chartUpdate();
  //     expect(JSON.stringify(scope.macroNutrientData)).toEqual(JSON.stringify(
  //        [{ key: 'Protein', y: "100" },
  //         { key: 'Carbs', y: "200" },
  //         { key: 'Fat', y: "300" }]));
  //   });
  //   it('sets up functions for d3 on scope', function () {
  //     scope.chartUpdate();
  //     expect(typeof scope.colorFunction).toEqual('function');
  //     expect(typeof scope.xFunction).toEqual('function');
  //     expect(typeof scope.yFunction).toEqual('function');
  //     expect(typeof scope.descriptionFunction).toEqual('function');
  //   });
  //
  // });

});

describe('Child Controllers', function () {


});
