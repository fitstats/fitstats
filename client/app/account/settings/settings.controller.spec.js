'use strict';

describe('Controller: SettingsCtrl', function () {

  var makeController;
  var scope;
  var AuthMock
  var q;

  beforeEach(module('fitStatsApp'));
  beforeEach(inject(function ($injector, $controller, $rootScope, $q) {

    scope = $rootScope.$new();
    q = $q;

    var makeAuthMock = function( arg ) {
      AuthMock = {
        changePassword: function (o, n) {
          var dfd = $q.defer()
          setTimeout(function () {
            dfd[arg]();
          },1);
          return dfd.promise;
        }
      };
      return AuthMock;
    }

    makeController = function (resolveOrReject) {
      return $controller('SettingsCtrl', {
        Auth: makeAuthMock(resolveOrReject),
        $scope: scope 
      });
    };

  }));

  it('creates an errors object', function () {
    var controller = makeController();
    expect(scope.errors).not.toBe(undefined);
  });

  it('scope.changePassword calls Auth.changePassword if form valid', function () {
    var controller = makeController('resolve');
    scope.user = {
      oldPassword: 'old',
      newPassword: 'new'
    };
    spyOn(AuthMock, 'changePassword').andCallThrough();
    scope.changePassword({$valid: true});
    setTimeout(function (AuthMock) {
      // wtf.
      // expect(AuthMock.changePassword).toHaveBeenCalledWith('old', 'new');
      expect(scope.message).toEqual('Password successfully changed.');
    }.bind(null, AuthMock), 5);
  });

  it('scope.changePassword to set errors when form invalid', function () {
    var controller = makeController('reject');
    // spyOn(AuthMock, 'changePassword').andCallThrough();
    scope.user = {
      oldPassword: 'old',
      newPassword: 'new'
    };
    scope.changePassword({$valid: false});
    setTimeout(function (scope) {
      expect(scope.message).toEqual('');
      expect(scope.errors.other).toEqual('Incorrect password');
    }.bind(null, scope), 5)
  });

});