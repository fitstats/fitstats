'use strict';

describe('Dashboard', function() {
  var ptor;

  browser.get( '/login' );
  var email = element( by.model( 'user.email' ) );
  email.sendKeys( 'admin@admin.com' );
  var password = element( by.model( 'user.password' ) );
  password.sendKeys( 'admin' );
  var form = element( by.tagName( 'form' ) );
  form.submit();

  beforeEach(function() {
    ptor = protractor.getInstance();
    console.log( ptor );
    browser.get( '/dashboard' );
  });

  it( 'should load the dashboard', function() {
    expect( ptor.getCurrentUrl() ).toEqual( ptor.baseUrl + 'dashboard/today' );
  });
});
