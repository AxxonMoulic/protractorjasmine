'use strict';

( function () {
	var ObservationPage = function () {
		var observationPage = element( by.css( '#content' ) );
		this.submitBtn      = observationPage.element( by.css( '[data-ng-click="vm.submitObs( $event )"]' ) );
		this.closeBtn       = observationPage.element( by.css( '[data-ng-click="vm.updateObs( true )"]' ) );
	};

	module.exports = ObservationPage;
} )();
