'use strict';
/* eslint no-undef:0 */
var LoginPage        = require( '../../login/login.page.js' );
var Commons          = require( '../../common.page.js' );
var ObservidencePage = require( '../observidence.page.js' );
var ObservationPage  = require( './observation.page.js' );

describe( 'Start-new-observation', function () {
	var loginPage;
	var commons;
	var observidence;
	var observation;

	beforeEach( function () {
		loginPage    = new LoginPage();
		commons      = new Commons();
		observidence = new ObservidencePage();
		observation  = new ObservationPage();

		loginPage.navigate();
		loginPage.login( 'testfoo', 'testfoo' );
		browser.waitForAngular();
		observidence.navigate();
	} );

	afterEach( function () {
		commons.logout();
	} );

	it( 'should fill up Location, Observee, Template and Start Obs', function () {
		observidence.startObsBtn.click();
		browser.waitForAngular();
		observidence.setStartObservationInfo( 'SchoolName', 0 ); // for Location use 'SchoolName'
		observidence.setStartObservationInfo( 'FirstName', 1 ); // for Observee use 'FirstName'
		observidence.setStartObservationInfo( 'name', 0 ); // for Template use 'name'
		observidence.continueAndStartBtn.click();
		browser.waitForAngular();
		expect( observation.submitBtn.isPresent() ).toBe( true );
	} );

} );
