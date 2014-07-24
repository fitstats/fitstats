'use strict';

describe('Home page', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    browser.get( 'http://127.0.0.1:9000' );
  });

  it( 'should load the home page', function() {
    expect( element( by.tagName( "h1" ) ).getText() ).toBe( "Unify your Fit Life" );
  });
});
