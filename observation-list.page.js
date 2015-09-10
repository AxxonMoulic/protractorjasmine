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

	var sortColumnName = function ( column ) {
		return element( by.css( 'th[data-ng-click="vm.changeSorting( \'' + column + '\' )"]' ) );
	};

	var paginationItem = function ( pageObj ) {
		return pageObj.element( by.css( '[ng-click="selectPage(page.number, $event)"]' ) );
	};

	var searchResult = function ( item, filter ) {
		return this.tableForm.get( item ).all( by.css( '[data-ng-click="vm.previewObservation(item.id)"]:not(.ng-hide)' ) ).get( filter );
	};

	var searchAll = function ( item, text ) {
		return this.tableForm.get( item ).all( by.cssContainingText( '[data-ng-click="vm.previewObservation(item.id)"]:not(.ng-hide)', text ) ).get( 0 );
	};

	var startObservationBtn = function ( item ) {
		return this.startObsBtn.get( item );
	};

	var clickDropDownStartObsModal = function ( pointername ) {
		return element( by.css( '[pointer = ' + pointername + ']' ) ).click();
	};

	var setStartObservationInfo = function ( pointername, index ) {
		clickDropDownStartObsModal( pointername );
		return element.all( by.css( '[pointer = ' + pointername + '] [data-ng-click="resultOption( choice )"]' ) ).get( index ).click();
	};

	var setStartObsTemplate = function ( pointername, templateName, index ) {
		clickDropDownStartObsModal( pointername );
		this.searchTemplate.clear().sendKeys( templateName );
		return element.all( by.css( '[pointer = ' + pointername + '] [data-ng-click="resultOption( choice )"]' ) ).get( index ).click();
	};

	var searchItemModal = function ( pointername, items ) {
		clickDropDownStartObsModal( pointername );
		element( by.css( '[pointer = ' + pointername + '] [data-ng-model="searchItem"]' ) ).clear().sendKeys( items );
		return element.all( by.css( '[pointer = ' + pointername + '] [data-ng-click="resultOption( choice )"]' ) ).get( 0 ).click();
	};

	var searchNonExistingItem = function ( pointername, items ) {
		clickDropDownStartObsModal( pointername );
		element( by.css( '[pointer = ' + pointername + '] [data-ng-model="searchItem"]' ) ).clear().sendKeys( items );
	};

	var selectFromMonth = function ( index ) {
		return this.fromCalendar.all( by.repeater( 'dt in row track by dt.date' ) ).get( index ).element( by.css( '[ng-click="select(dt.date)"]' ) );
	};

	var selectToMonth = function ( index ) {
		return this.toCalendar.all( by.repeater( 'dt in row track by dt.date' ) ).get( index ).element( by.css( '[ng-click="select(dt.date)"]' ) );
	};

	var clickCalendarDate = function ( pageObj ) {
		return pageObj.element( by.css( '[ng-click="select(dt.date)"]' ) );
	};

	var ObservidencePage = function () {
		var observidencePage = element( by.css( '#content' ) );
		this.navTab          = observidencePage.element( by.css( '[ng-repeat="nav in navs track by $index"]:not(.active) [ng-click="vm.setActive( $index )"]' ) );
		this.isDateStarted   = observidencePage.all( by.css( 'th[data-ng-show="vm.isInProgress()"]' ) ).get( 0 );
		this.isDateSubmitted = observidencePage.all( by.css( 'th[data-ng-hide="vm.isInProgress()"]' ) ).get( 0 );
		this.searchTxt       = observidencePage.element( by.model( 'vm.searchText' ) );
		this.searchTemplate  = element( by.css( 'input[type="text"][placeholder="Search templates"]' ) );

		var tableForm       = observidencePage.all( by.css( '.table > tbody tr.ng-scope:not(.ng-hide)' ) );
		this.tableForm      = tableForm;
		this.firstRow       = tableForm.first().all( by.css( '[data-ng-click="vm.previewObservation(item.id)"]' ) );
		this.lastRow        = tableForm.last().all( by.css( '[data-ng-click="vm.previewObservation(item.id)"]' ) );
		this.clickableItems = tableForm.all( by.css( '[data-ng-click="vm.previewObservation(item.id)"]:not(.ng-hide)' ) );
		this.filterNoResult = element( by.css( '.info-message' ) );

		this.startObsBtn         = observidencePage.all( by.css( '[data-ng-click="vm.openModal()"]' ) );
		this.modalCloseBtn       = element( by.css( '[data-ng-click="vm.close()"]' ) );
		this.continueAndStartBtn = element( by.css( '[data-ng-click="vm.submitObs()"]' ) );
		this.noResultMsg         = element( by.css( '[data-ng-if="searchItem.length"]' ) );
		this.closeNoResult       = element.all( by.css( '[data-ng-click="hidePopElement()"]' ) ).get( 0 );

		var fromCalendar = observidencePage.all( by.css( '[ng-switch="datepickerMode"]' ) ).get( 0 );
		this.fromCalendar = fromCalendar;
		this.fromDateBtn = observidencePage.element( by.css( '[data-ng-click="vm.startOpen($event)"]' ) );
		this.clickFromMonth = fromCalendar.element( by.css( '[ng-click="toggleMode()"]' ) );
		this.clickableFromDates = fromCalendar.all( by.css( '[aria-disabled="false"]' ) );

		var toCalendar = observidencePage.all( by.css( '[ng-switch="datepickerMode"]' ) ).get( 1 );
		this.toCalendar = toCalendar;
		this.toDateBtn = observidencePage.element( by.css( '[data-ng-click="vm.endOpen($event)"]' ) );
		this.clickToMonth = toCalendar.element( by.css( '[ng-click="toggleMode()"]' ) );
		this.clickableToDates = toCalendar.all( by.css( '[aria-disabled="false"]' ) );

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
	ObservidencePage.prototype.startObservationBtn     = startObservationBtn;
	ObservidencePage.prototype.searchItemModal         = searchItemModal;
	ObservidencePage.prototype.searchNonExistingItem   = searchNonExistingItem;
	ObservidencePage.prototype.setStartObsTemplate     = setStartObsTemplate;
	ObservidencePage.prototype.selectFromMonth         = selectFromMonth;
	ObservidencePage.prototype.selectToMonth           = selectToMonth;
	ObservidencePage.prototype.clickCalendarDate       = clickCalendarDate;

	module.exports = ObservidencePage;
} )();
