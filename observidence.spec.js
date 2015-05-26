'use strict';
/* eslint no-undef:0 */
var LoginPage        = require( '../login/login.page.js' );
var Commons          = require( '../common.page.js' );
var ObservidencePage = require( '../observations/observidence.page.js' );

describe( 'ObservidencePage', function () {
	var loginPage;
	var commons;
	var observidence;

	beforeEach( function () {
		loginPage    = new LoginPage();
		commons      = new Commons();
		observidence = new ObservidencePage();

		loginPage.navigate();
		loginPage.login( 'testfoo', 'testfoo' );
		browser.waitForAngular();
		observidence.navigate();
	} );

	afterEach( function () {
		commons.logout();
	} );

	it( 'should click the In-Progress button', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		expect( observidence.isDateStarted.getText() ).toBe( 'Date Started' );
	} );

	it( 'should click the Submitted button', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		observidence.subBtn.click();
		browser.waitForAngular();
		expect( observidence.isDateSubmitted.getText() ).toBe( 'Date Submitted' );
	} );

	it( 'should sort the list by Name', function () {
		observidence.sortColumnName( 'name' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.first().getText();
		observidence.sortColumnName( 'name' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.first().getText() ).toBe( holder );
	} );

	it( 'should sort the list by Observee', function () {
		observidence.sortColumnName( 'observee' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 1 ).getText();
		observidence.sortColumnName( 'observee' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.get( 1 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Observer', function () {
		observidence.sortColumnName( 'observer' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 2 ).getText();
		observidence.sortColumnName( 'observer' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.get( 2 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Template', function () {
		observidence.sortColumnName( 'template' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 3 ).getText();
		observidence.sortColumnName( 'template' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.get( 3 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Date Submitted', function () {
		observidence.sortColumnName( 'submitDate' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 4 ).getText();
		observidence.sortColumnName( 'submitDate' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.get( 4 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Total Score', function () {
		observidence.sortColumnName( 'finalScore' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.last().getText();
		observidence.sortColumnName( 'finalScore' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.last().getText() ).toBe( holder );
	} );

	it( 'should sort the list by Date Started', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		observidence.sortColumnName( 'startDate' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.last().getText();
		observidence.sortColumnName( 'startDate' ).click();
		browser.waitForAngular();
		expect( observidence.lastRow.last().getText() ).toBe( holder );
	} );

	it( 'should search the text without filter', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		var holder = observidence.countItems();
		observidence.searchText( 'erap' );
		browser.waitForAngular();
		expect( observidence.countItems() ).not.toBe( holder );
	} );

	it( 'should search text using Name filter', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		var holder = observidence.countItems();
		observidence.searchText( 'erap' );
		observidence.dropDownFilterBtn( 'Name' ).click();
		browser.waitForAngular();
		expect( observidence.countItems() ).not.toBe( holder );
	} );

	it( 'should search text using Observee filter', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		var holder = observidence.countItems();
		observidence.searchText( 'erap' );
		observidence.dropDownFilterBtn( 'Observee' ).click();
		browser.waitForAngular();
		expect( observidence.countItems() ).not.toBe( holder );
	} );

	it( 'should search text using Observer filter', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		var holder = observidence.countItems();
		observidence.searchText( 'erap' );
		observidence.dropDownFilterBtn( 'Observer' ).click();
		browser.waitForAngular();
		expect( observidence.countItems() ).not.toBe( holder );
	} );

	it( 'should search text using Template filter', function () {
		observidence.inProgBtn.click();
		browser.waitForAngular();
		var holder = observidence.countItems();
		observidence.searchText( 'erap' );
		observidence.dropDownFilterBtn( 'Template' ).click();
		browser.waitForAngular();
		expect( observidence.countItems() ).not.toBe( holder );
	} );
} );
