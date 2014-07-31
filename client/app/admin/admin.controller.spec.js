'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('fitStatsApp'));

  var createController;
  var scope;
  var $httpBackend;
  var UserMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope) {

    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/users').respond([
      {_id: 1},
      {_id: 2}
    ]);

    $httpBackend.when('DELETE', '/api/users/1').respond(200);

    UserMock = jasmine.createSpyObj('User', [
      'changePassword',
      'get',
      'getMFP',
      'remove'
    ]);

    createController = function() {
      return $controller('AdminCtrl', {
        $scope: $rootScope,
        User: UserMock
      });
    };

  }));

  it('GETs /api/users/ on init', function () {
    $httpBackend.expectGET('/api/users');
    var controller = createController();
    $httpBackend.flush();
    expect(scope.users.length).toEqual(2);
  });

  it('$scope.delete calls User.remove and removes the user from scope.users', function () {
    $httpBackend.expectGET('/api/users');
    var controller = createController();
    $httpBackend.flush();
    expect(scope.users.length).toEqual(2);    
    scope.delete(scope.users[0]);
    expect(UserMock.remove).toHaveBeenCalled();
    expect(scope.users.length).toEqual(1);
  });

});