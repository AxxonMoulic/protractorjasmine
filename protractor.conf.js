'use strict';
/* jshint -W117 */
/* eslint no-undef:0 */

exports.config = {
	// The address of a running selenium server.
	'seleniumAddress' : 'http://localhost:4444/wd/hub',

	// The address where our server under test is running
	'baseUrl' : 'http://localhost:8080/',
	// Capabilities to be passed to the webdriver instance.

	'capabilities' : {
		'browserName' : 'chrome'
	},

	// Spec patterns are relative to the location of the // spec file. They may include glob patterns.
	'specs' : [ 'test/e2e/**/*.spec.js' ],

	'framework' : 'jasmine2',

	// Options to be passed to Jasmine-node.
	'jasmineNodeOpts' : {
		'showColors' : true, // Use colors in the command line report.
		'print'      : function () {},
		'isVerbose'  : true
	},

	'onPrepare' : function () {
		var SpecReporter = require( 'jasmine-spec-reporter' );
		// add jasmine spec reporter
		jasmine.getEnv().addReporter( new SpecReporter( {
			'displayStacktrace' : true // display stacktrace for each failed assertion
		} ) );
	}
};
