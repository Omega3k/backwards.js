var tape = require( './_tape.mock.js' )
	, test = tape.test

	, backwards   = require( '../src/backwards.js' )
	, isArguments = require( './isArguments.test.js' )
	, isArray     = require( './isArray.test.js' )
;

isArguments( test, backwards );
isArray( test, backwards );

this.global_test_results = tape.getResults();