var tape = require( './_tape.mock.js' )
	, test = tape.test

	, backwards   = require( '../src/backwards.js' )

	, isArguments = require( './isArguments.test.js' )
	, isArray     = require( './isArray.test.js' )
	, isBoolean   = require( './isBoolean.test.js' )
	, isFunction  = require( './isFunction.test.js' )
	, isNull      = require( './isNull.test.js' )
	, isNumber    = require( './isNumber.test.js' )
;

isArguments( test, backwards );
isArray( test, backwards );
isBoolean( test, backwards );
isFunction( test, backwards );
isNull( test, backwards );
isNumber( test, backwards );

window.global_test_results = tape.getResults();