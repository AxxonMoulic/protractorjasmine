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

	var setMonth = function ( index ) {
		element( by.css( '[ng-click = "toggleMode()"]' ) ).get( index ).click();
		element( by.css( '[ng-model = "date"]' ) ).get( index ).element( by.css( '[ng-switch-when="month"] [ng-repeat="row in rows track by $index"]' ) ).get( 1 ).element( by.css( '[ng-repeat="dt in row track by dt.date"]' ) ).get( 1 ).element( by.css( '[ng-click="select(dt.date)"]' ) ).get( 0 ).click()
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

		this.startDateBtn = observidencePage.element( by.css( '[data-ng-click="vm.startOpen($event)"]' ) );
		this.endDateBtn   = observidencePage.element( by.css( '[data-ng-click="vm.endOpen($event)"]' ) );

		this.pageNavBtn  = element.all( by.repeater( 'page in pages track by $index' ) );
	};

	ObservidencePage.prototype.navigate                = navigate;
	ObservidencePage.prototype.setStartObservationInfo = setStartObservationInfo;
	ObservidencePage.prototype.sortColumnName          = sortColumnName;
	ObservidencePage.prototype.searchText              = searchText;
	ObservidencePage.prototype.dropDownFilterBtn       = dropDownFilterBtn;
	ObservidencePage.prototype.paginationItem          = paginationItem;

	module.exports = ObservidencePage;
} )();
