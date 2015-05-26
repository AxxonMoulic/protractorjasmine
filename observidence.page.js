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

	var countItems = function () {
		return element.all( by.css( '.table > tbody tr.ng-scope:not(.ng-hide)' ) ).count();
	};

	var ObservidencePage = function () {
		var observidencePage = element( by.css( '#content' ) );
		this.subBtn          = observidencePage.element( by.css( 'label.submitted' ) );
		this.inProgBtn       = observidencePage.element( by.css( 'label.in-progress' ) );
		this.isDateStarted   = observidencePage.all( by.css( '.info th[data-ng-show="vm.isInProgress()"]' ) ).get( 0 );
		this.isDateSubmitted = observidencePage.all( by.css( '.info th[data-ng-hide="vm.isInProgress()"]' ) ).get( 0 );
		this.searchTxt       = observidencePage.element( by.model( 'vm.searchText' ) );

		var tableForm = observidencePage.all( by.css( '.table > tbody tr.ng-scope:not(.ng-hide)' ) );
		this.firstRow = tableForm.first().all( by.css( '.obs-link' ) );
		this.lastRow  = tableForm.last().all( by.css( '.obs-link' ) );

		this.startObsBtn         = observidencePage.element( by.css( '[data-ng-click="vm.openModal()"]' ) );
		this.continueAndStartBtn = element( by.css( '[data-ng-click="vm.submitObs()"]' ) );
	};

	ObservidencePage.prototype.navigate                = navigate;
	ObservidencePage.prototype.setStartObservationInfo = setStartObservationInfo;
	ObservidencePage.prototype.sortColumnName          = sortColumnName;
	ObservidencePage.prototype.searchText              = searchText;
	ObservidencePage.prototype.dropDownFilterBtn       = dropDownFilterBtn;
	ObservidencePage.prototype.countItems              = countItems;

	module.exports = ObservidencePage;
} )();
