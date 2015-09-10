'use strict';
/* eslint no-undef:0 */
/* eslint max-nested-callbacks:0 */

var LoginPage        = require( '../login/login.page.js' );
var Commons          = require( '../common.page.js' );
var ObservidencePage = require( '../observations/observation-list.page.js' );
var ObservationPage  = require( './start-new-observation/observation.page.js' );

describe( 'Observation Page', function () {
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

	describe( 'Submitted list', function () {

		it( 'should click the Submitted tab', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			expect( observidence.isDateSubmitted.getText() ).toBe( 'Date Submitted' );
		} );

		it( 'should change the FROM to current date and show corresponding obs list', function () {
			var mydate = new Date();
			var currentmonth = mydate.getMonth();
			var submitteddate;
			submitteddate = ( '0' + ( mydate.getMonth() + 1 ) ).slice( -2 ) + '/' + ( '0' + mydate.getDate() ).slice( -2 ) + '/' + mydate.getFullYear();
			observidence.navTab.click();
			observidence.fromDateBtn.click();
			observidence.clickFromMonth.click();
			observidence.selectFromMonth( currentmonth ).click();
			observidence.clickableFromDates.count().then( function ( count ) {
				count = count - 1;
				observidence.clickableFromDates.then( function ( date ) {
					observidence.clickCalendarDate( date[ count ] ).click();
				} );
			} );
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 4 ).getText() ).toContain( submitteddate ); // use 4 when evaluating Submitted Date column
				}
			} );
		} );

		it( 'should change the FROM and To date to yesterday and show corresponding obs list', function () {
			var mydate = new Date();
			var currentmonth = mydate.getMonth();
			var pastdatestring;
			pastdatestring = ( '0' + ( mydate.getMonth() + 1 ) ).slice( -2 ) + '/' + ( '0' + ( mydate.getDate() - 1 ) ).slice( -2 ) + '/' + mydate.getFullYear();
			observidence.navTab.click();
			observidence.fromDateBtn.click();
			observidence.clickFromMonth.click();
			observidence.selectFromMonth( currentmonth ).click();
			observidence.clickableFromDates.count().then( function ( count ) {
				count = count - 2;
				observidence.clickableFromDates.then( function ( date ) {
					observidence.clickCalendarDate( date[ count ] ).click();
				} );
			} );
			observidence.toDateBtn.click();
			observidence.clickToMonth.click();
			observidence.selectToMonth( currentmonth ).click();
			observidence.clickableToDates.then( function ( date ) {
				observidence.clickCalendarDate( date[ 0 ] ).click();
			} );
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 4 ).getText() ).toContain( pastdatestring ); // use 4 when evaluating Submitted Date column
				}
			} );
		} );

		it( 'should sort the list by Name', function () {
			observidence.navTab.click();
			browser.waitForAngular();
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

		it( 'should sort the list by Invitee', function () {
			observidence.navTab.click();
			browser.waitForAngular();
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
			observidence.navTab.click();
			browser.waitForAngular();
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
			observidence.navTab.click();
			browser.waitForAngular();
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

		it( 'should display No Results Found if text is not found', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.searchText( 'obama' );
			browser.waitForAngular();
			expect( observidence.filterNoResult.getText() ).toBe( 'No results found for given date range or filter.' );
		} );

		it( 'should search the text without filter', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.searchText( 'hardy' );
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchAll( row, 'Hardy' ).getText() ).toContain( 'Hardy' );
				}
			} );
		} );

		it( 'should search text using Name filter', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.searchText( 'hardy' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Name' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 0 ).getText() ).toContain( 'Hardy' ); // use 0 when evaluating Name column
				}
			} );
		} );

		it( 'should search text using Invitee filter', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.searchText( 'jones' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Invitee' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 1 ).getText() ).toContain( 'Jones' ); // use 1 when evaluating Observee column
				}
			} );
		} );

		it( 'should search text using Observer filter', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.searchText( 'FOO' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Observer' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 2 ).getText() ).toContain( 'Foo' ); // use 2 when evaluating Observer column
				}
			} );
		} );

		it( 'should search text using Template filter', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.searchText( 'flam' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Template' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 3 ).getText() ).toContain( 'Flaming' ); // use 3 when evaluating Template column
				}
			} );
		} );

		it( 'should click random Submitted item in random column', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.clickableItems.count().then( function ( val ) {
				val = Math.floor( Math.random() * val );
				observidence.clickableItems.get( val ).click();
				expect( observation.printBtn.isPresent() ).toBe( true );
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

	describe( 'In-Progress list', function () {

		it( 'should click the In-Progress tab', function () {
			observidence.navTab.click();
			browser.waitForAngular();
			observidence.navTab.click();
			browser.waitForAngular();
			expect( observidence.isDateStarted.getText() ).toBe( 'Date Started' );
		} );

		it( 'should change the FROM to current date and show corresponding obs list', function () {
			var mydate = new Date();
			var currentmonth = mydate.getMonth();
			var submitteddate;
			submitteddate = ( '0' + ( mydate.getMonth() + 1 ) ).slice( -2 ) + '/' + ( '0' + mydate.getDate() ).slice( -2 ) + '/' + mydate.getFullYear();
			observidence.fromDateBtn.click();
			observidence.clickFromMonth.click();
			observidence.selectFromMonth( currentmonth ).click();
			observidence.clickableFromDates.count().then( function ( count ) {
				count = count - 1;
				observidence.clickableFromDates.then( function ( date ) {
					observidence.clickCalendarDate( date[ count ] ).click();
				} );
			} );
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 4 ).getText() ).toContain( submitteddate ); // use 4 when evaluating Submitted Date column
				}
			} );
		} );

		it( 'should change the FROM and To date to yesterday and show corresponding obs list', function () {
			var mydate = new Date();
			var currentmonth = mydate.getMonth();
			var pastdatestring;
			pastdatestring = ( '0' + ( mydate.getMonth() + 1 ) ).slice( -2 ) + '/' + ( '0' + ( mydate.getDate() - 1 ) ).slice( -2 ) + '/' + mydate.getFullYear();
			observidence.fromDateBtn.click();
			observidence.clickFromMonth.click();
			observidence.selectFromMonth( currentmonth ).click();
			observidence.clickableFromDates.count().then( function ( count ) {
				count = count - 2;
				observidence.clickableFromDates.then( function ( date ) {
					observidence.clickCalendarDate( date[ count ] ).click();
				} );
			} );
			observidence.toDateBtn.click();
			observidence.clickToMonth.click();
			observidence.selectToMonth( currentmonth ).click();
			observidence.clickableToDates.then( function ( date ) {
				observidence.clickCalendarDate( date[ 0 ] ).click();
			} );
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 4 ).getText() ).toContain( pastdatestring ); // use 4 when evaluating Submitted Date column
				}
			} );
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

		it( 'should sort the list by Invitee', function () {
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

		it( 'should display No Results Found if text is not found', function () {
			observidence.searchText( 'obama' );
			browser.waitForAngular();
			expect( observidence.filterNoResult.getText() ).toBe( 'No results found for given date range or filter.' );
		} );

		it( 'should search the text without filter', function () {
			observidence.searchText( 'neena' );
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchAll( row, 'Neena' ).getText() ).toContain( 'Neena' );
				}
			} );
		} );

		it( 'should search text using Name filter', function () {
			observidence.searchText( 'brad' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Name' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 0 ).getText() ).toContain( 'Braddock' ); // use 0 when evaluating Name column
				}
			} );
		} );

		it( 'should search text using Invitee filter', function () {
			observidence.searchText( 'eli' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Invitee' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 1 ).getText() ).toContain( 'Elizabeth' ); // use 1 when evaluating Observee column
				}
			} );
		} );

		it( 'should search text using Observer filter', function () {
			observidence.searchText( 'FOO' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Observer' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 2 ).getText() ).toContain( 'Foo' ); // use 2 when evaluating Observer column
				}
			} );
		} );

		it( 'should search text using Template filter', function () {
			observidence.searchText( 'flam' );
			browser.waitForAngular();
			observidence.dropDownFilterBtn( 'Template' ).click();
			browser.waitForAngular();
			observidence.tableForm.count().then( function ( count ) {
				for ( var row = 0; row < count; row++ ) {
					expect( observidence.searchResult( row, 3 ).getText() ).toContain( 'Flaming' ); // use 3 when evaluating Template column
				}
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

	} );

} );
