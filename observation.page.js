'use strict';

( function () {
	var ObservationPage = function () {
		var observationPage = element( by.css( '#content' ) );
		this.scriptingBtn   = observationPage.element( by.css( '[data-ng-click="vm.toggleModal()"]' ) );
		this.submitBtn      = observationPage.element( by.css( '[data-ng-click="vm.submitObs( $event )"]' ) );
		this.inProgCloseBtn = observationPage.element( by.css( '[data-ng-click="vm.updateObs( true )"]' ) );

		this.editBtn        = observationPage.element( by.css( '[data-ng-click="vm.generateVersion()"]' ) );
		this.printBtn       = observationPage.element( by.css( '.ti-printer' ) );
		this.submitCloseBtn = observationPage.element( by.css( '.ti-close' ) );
	};

	module.exports = ObservationPage;
} )();
