'use strict';

( function () {
	var navigate = function () {
		browser.get( '#!/observations' );
	};

	var searchText = function ( text ) {
		this.searchTxt.clear().sendKeys( text );
	};

	var dropDownFilterBtn = function ( filter ) {
		element( by.css( '.dropdown-toggle' ) ).click();
		return element( by.css( '.input-group-btn [data-ng-click = "vm.changeFilter( \'' + filter + '\' )"]' ) );
	};

	var setStartObservationInfo = function ( pointername, index ) {
		element.all( by.css( '[pointer = ' + pointername + '] .container-select' ) ).get( 0 ).click();
		return element.all( by.css( '[pointer = ' + pointername + '] .container-select [data-ng-click="resultOption( choice )"]' ) ).get( index ).click();
	};

	var sortColumnName = function ( column ) {
		return element( by.css( 'th[data-ng-click="vm.changeSorting( \'' + column + '\' )"]' ) );
	};

	var paginationItem = function ( pageObj ) {
		return pageObj.element( by.css( '[ng-click="selectPage(page.number, $event)"]' ) );
	};

	var searchResult = function ( item, filter ) {
		return this.tableForm.get( item ).all( by.css( '.obs-link:not(.ng-hide)' ) ).get( filter );
	};

	var searchAll = function ( item, text ) {
		return this.tableForm.get( item ).all( by.cssContainingText( '.obs-link:not(.ng-hide)', text ) ).get( 0 );
	};

	var ObservidencePage = function () {
		var observidencePage = element( by.css( '#content' ) );
		this.navTab          = observidencePage.element( by.css( '[ng-repeat="nav in navs track by $index"]:not(.active) [ng-click="vm.setActive( $index )"]' ) );
		this.isDateStarted   = observidencePage.all( by.css( 'th[data-ng-show="vm.isInProgress()"]' ) ).get( 0 );
		this.isDateSubmitted = observidencePage.all( by.css( 'th[data-ng-hide="vm.isInProgress()"]' ) ).get( 0 );
		this.searchTxt       = observidencePage.element( by.model( 'vm.searchText' ) );

		var tableForm       = observidencePage.all( by.css( '.table > tbody tr.ng-scope:not(.ng-hide)' ) );
		this.tableForm      = tableForm;
		this.firstRow       = tableForm.first().all( by.css( '.obs-link' ) );
		this.lastRow        = tableForm.last().all( by.css( '.obs-link' ) );
		this.clickableItems = tableForm.all( by.css( '[data-ng-click="vm.previewObservation(item.id)"]:not(.ng-hide)' ) );

		this.startObsBtn         = observidencePage.element( by.css( '[data-ng-click="vm.openModal()"]' ) );
		this.continueAndStartBtn = element( by.css( '[data-ng-click="vm.submitObs()"]' ) );

		this.pageNavBtn  = element.all( by.repeater( 'page in pages track by $index' ) );
	};

	ObservidencePage.prototype.navigate                = navigate;
	ObservidencePage.prototype.setStartObservationInfo = setStartObservationInfo;
	ObservidencePage.prototype.sortColumnName          = sortColumnName;
	ObservidencePage.prototype.searchText              = searchText;
	ObservidencePage.prototype.dropDownFilterBtn       = dropDownFilterBtn;
	ObservidencePage.prototype.paginationItem          = paginationItem;
	ObservidencePage.prototype.searchResult            = searchResult;
	ObservidencePage.prototype.searchAll               = searchAll;

	module.exports = ObservidencePage;
} )();
