'use strict';
/* eslint no-undef:0 */
var LoginPage        = require( '../login/login.page.js' );
var Commons          = require( '../common.page.js' );
var ObservidencePage = require( '../observations/observidence.page.js' );
var ObservationPage  = require( './start-new-observation/observation.page.js' );

describe( 'ObservidencePage', function () {
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

	it( 'should click the Submitted button', function () {
		observidence.navTab.click();
		browser.waitForAngular();
		expect( observidence.isDateSubmitted.getText() ).toBe( 'Date Submitted' );
	} );

	it( 'should click the In-Progress button', function () {
		observidence.navTab.click();
		browser.waitForAngular();
		observidence.navTab.click();
		browser.waitForAngular();
		expect( observidence.isDateStarted.getText() ).toBe( 'Date Started' );
	} );

	it( 'should sort the list by Name', function () {
		observidence.sortColumnName( 'name' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.first().getText();
		observidence.sortColumnName( 'name' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.first().getText() ).toBe( holder );
	} );

	it( 'should sort the list by Observee', function () {
		observidence.sortColumnName( 'observee' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 1 ).getText();
		observidence.sortColumnName( 'observee' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.get( 1 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Observer', function () {
		observidence.sortColumnName( 'observer' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 2 ).getText();
		observidence.sortColumnName( 'observer' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.get( 2 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Template', function () {
		observidence.sortColumnName( 'template' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 3 ).getText();
		observidence.sortColumnName( 'template' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.get( 3 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Date Submitted', function () {
		observidence.navTab.click();
		browser.waitForAngular();
		observidence.sortColumnName( 'submitDate' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.get( 4 ).getText();
		observidence.sortColumnName( 'submitDate' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.get( 4 ).getText() ).toBe( holder );
	} );

	it( 'should sort the list by Total Score', function () {
		observidence.navTab.click();
		browser.waitForAngular();
		observidence.sortColumnName( 'finalScore' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.last().getText();
		observidence.sortColumnName( 'finalScore' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.last().getText() ).toBe( holder );
	} );

	it( 'should sort the list by Date Started', function () {
		observidence.sortColumnName( 'startDate' ).click();
		browser.waitForAngular();
		var holder = observidence.firstRow.last().getText();
		observidence.sortColumnName( 'startDate' ).click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
					}
				} );
			}
		} );
		expect( observidence.lastRow.last().getText() ).toBe( holder );
	} );

	it( 'should search the text without filter', function () {
		observidence.tableForm.count().then( function ( val ) {
			observidence.searchText( 'erap' );
			browser.waitForAngular();
			expect( observidence.tableForm.count() ).not.toBe( val );
		} );
	} );

	it( 'should search text using Name filter', function () {
		observidence.tableForm.count().then( function ( val ) {
			observidence.searchText( 'erap' );
			observidence.dropDownFilterBtn( 'Name' ).click();
			browser.waitForAngular();
			expect( observidence.tableForm.count() ).not.toBe( val );
		} );
	} );

	it( 'should search text using Observee filter', function () {
		observidence.tableForm.count().then( function ( val ) {
			observidence.searchText( 'erap' );
			observidence.dropDownFilterBtn( 'Observee' ).click();
			browser.waitForAngular();
			expect( observidence.tableForm.count() ).not.toBe( val );
		} );
	} );

	it( 'should search text using Observer filter', function () {
		observidence.tableForm.count().then( function ( val ) {
			observidence.searchText( 'erap' );
			observidence.dropDownFilterBtn( 'Observer' ).click();
			browser.waitForAngular();
			expect( observidence.tableForm.count() ).not.toBe( val );
		} );
	} );

	it( 'should search text using Template filter', function () {
		observidence.tableForm.count().then( function ( val ) {
			observidence.searchText( 'erap' );
			observidence.dropDownFilterBtn( 'Template' ).click();
			browser.waitForAngular();
			expect( observidence.tableForm.count() ).not.toBe( val );
		} );
	} );

	it( 'should click random Submitted item and random column', function () {
		observidence.navTab.click();
		browser.waitForAngular();
		observidence.clickableItems.count().then( function ( val ) {
			val = Math.floor( Math.random() * val );
			observidence.clickableItems.get( val ).click();
			expect( observation.printBtn.isPresent() ).toBe( true );
		} );
	} );

	it( 'should click random In-Progress item in random column', function () {
		observidence.clickableItems.count().then( function ( val ) {
			val = Math.floor( Math.random() * val );
			observidence.clickableItems.get( val ).click();
			expect( observation.submitBtn.isPresent() ).toBe( true );
		} );
	} );

	it( 'should click available pages of the list under In-Progress', function () {
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
						expect( observidence.paginationItem( page[ i ] ).getText() ).not.toBe( '1' );
					}
					observidence.paginationItem( page[ 0 ] ).click();
					expect( observidence.paginationItem( page[ 0 ] ).getText() ).toBe( '1' );
				} );
			}
		} );
	} );

	it( 'should click available pages of the list under Submitted', function () {
		observidence.navTab.click();
		browser.waitForAngular();
		observidence.pageNavBtn.count().then( function ( count ) {
			if ( count > 1 ) {
				observidence.pageNavBtn.then( function ( page ) {
					for ( var i = 1; i < count; i++ ) {
						observidence.paginationItem( page[ i ] ).click();
						expect( observidence.paginationItem( page[ i ] ).getText() ).not.toBe( '1' );
					}
					observidence.paginationItem( page[ 0 ] ).click();
					expect( observidence.paginationItem( page[ 0 ] ).getText() ).toBe( '1' );
				} );
			}
		} );
	} );

} );
