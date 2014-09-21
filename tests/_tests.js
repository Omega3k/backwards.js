var tape = require( './_tape.mock.js' )
	, test = tape.test

	, backwards   = require( '../src/backwards.js' )
	, isArguments = require( './isArguments.test.js' )
;

isArguments( test, backwards.isArguments );

window.global_test_results = tape.getResults();