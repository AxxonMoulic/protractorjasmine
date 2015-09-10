'use strict';
/* eslint no-undef:0 */
var LoginPage        = require( '../../login/login.page.js' );
var Commons          = require( '../../common.page.js' );
var ObservidencePage = require( '../observation-list.page.js' );
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

	it( 'should fill up Location, Invitee, Template and Start Obs', function () {
		observidence.startObservationBtn( 0 ).click(); // 0=desktop view, 1=ipad view
		browser.waitForAngular();
		observidence.setStartObservationInfo( 'SchoolName', 0 ); // for Location use 'SchoolName'
		observidence.setStartObservationInfo( 'FirstName', 0 ); // for Invitee use 'FirstName'
		observidence.setStartObservationInfo( 'name', 0 ); // for Template use 'name'
		observidence.continueAndStartBtn.click();
		browser.waitForAngular();
		expect( observation.submitBtn.isPresent() ).toBe( true );
		observation.saveAndCloseBtn.click();
	} );

	it( 'should not be able to start until all info are filled up', function () {
		observidence.startObservationBtn( 0 ).click(); // 0=desktop view, 1=ipad view
		browser.waitForAngular();
		expect( observidence.continueAndStartBtn.isEnabled() ).toBe( false );
		observidence.setStartObservationInfo( 'SchoolName', 0 );
		expect( observidence.continueAndStartBtn.isEnabled() ).toBe( false );
		observidence.setStartObservationInfo( 'FirstName', 0 );
		expect( observidence.continueAndStartBtn.isEnabled() ).toBe( false );
		observidence.setStartObservationInfo( 'name', 0 );
		expect( observidence.continueAndStartBtn.isEnabled() ).toBe( true );
		observidence.continueAndStartBtn.click();
		browser.waitForAngular();
		expect( observation.submitBtn.isPresent() ).toBe( true );
		observation.saveAndCloseBtn.click();
	} );

	it( 'should search available items', function () {
		observidence.startObservationBtn( 0 ).click(); // 0=desktop view, 1=ipad view
		browser.waitForAngular();
		observidence.searchItemModal( 'SchoolName', 'demo' ); // for Location use 'SchoolName'
		observidence.searchItemModal( 'FirstName', 'user 21' ); // for Invitee use 'FirstName'
		observidence.searchItemModal( 'name', 'test' ); // for Template use 'name'
		observidence.continueAndStartBtn.click();
		browser.waitForAngular();
		expect( observation.submitBtn.isPresent() ).toBe( true );
		observation.saveAndCloseBtn.click();
	} );

	it( 'should display No Results Found if text is not found', function () {
		observidence.startObservationBtn( 0 ).click(); // 0=desktop view, 1=ipad view
		browser.waitForAngular();
		observidence.searchNonExistingItem( 'SchoolName', 'usc' );
		expect( observidence.noResultMsg.getText() ).toBe( 'No results found.' );
		observidence.closeNoResult.click();
		observidence.searchItemModal( 'SchoolName', 'demo' );
		observidence.searchNonExistingItem( 'FirstName', 'barrack' );
		expect( observidence.noResultMsg.getText() ).toBe( 'No results found.' );
		observidence.closeNoResult.click();
		observidence.searchItemModal( 'FirstName', 'user 21' );
		observidence.searchNonExistingItem( 'name', 'obama care' );
		expect( observidence.noResultMsg.getText() ).toBe( 'No results found.' );
		observidence.closeNoResult.click();
		observidence.searchItemModal( 'name', 'test' );
		observidence.continueAndStartBtn.click();
		browser.waitForAngular();
		expect( observation.submitBtn.isPresent() ).toBe( true );
		observation.saveAndCloseBtn.click();
	} );

	it( 'should close the modal when clicking Close button', function () {
		observidence.startObservationBtn( 0 ).click(); // 0=desktop view, 1=ipad view
		browser.waitForAngular();
		observidence.modalCloseBtn.click();
		expect( observidence.modalCloseBtn.isPresent() ).toBe( false );
	} );

} );
