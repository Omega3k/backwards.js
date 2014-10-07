// http://www.codewars.com/kata/operator-overload/solutions/javascript?show-solutions=1
// var Foo = function(value) { this.val = value; }
// Foo.prototype.valueOf = function() { return this.val; }

var tape         = require( './_tape.mock.js' )
	, test         = tape.test
	
	, htmlbuilder  = require( '../test-suite/htmlbuilder.js' )
	
	, backwards    = require( '../src/backwards.js' )
	
	, isArguments  = require( './isArguments.test.js' )( test, backwards )
	, isArray      = require( './isArray.test.js' )( test, backwards )
	, isBoolean    = require( './isBoolean.test.js' )( test, backwards )
	, isFunction   = require( './isFunction.test.js' )( test, backwards )
	, isNull       = require( './isNull.test.js' )( test, backwards )
	, isNumber     = require( './isNumber.test.js' )( test, backwards )
	, isObject     = require( './isObject.test.js' )( test, backwards )
	, isString     = require( './isString.test.js' )( test, backwards )
	, isUndefined  = require( './isUndefined.test.js' )( test, backwards )
	
	, compose      = require( './compose.test.js' )( test, backwards )
	, map          = require( './map.test.js' )( test, backwards )

	, test_results = tape.getResults()
	, passed_tests = []
	, failed_tests = []
	, x, val, i, j, result
;

x = test_results.tests

for ( i = 0; i < x.length; i++ ) {
	val    = x[i].tests;
	result = true;
	for ( j = 0; j < val.length; j++ ) {
		if ( !val[j].passed ) {
			result = false;
		}
	}

	if ( result ) {
		passed_tests.push( x[i] );
	} else {
		failed_tests.push( x[i] );
	}
}

window.global_test_results = {
	passed: test_results.passed,
	failed: test_results.failed,
	total: test_results.total,
	tests: failed_tests
};

var $summary = window.document.getElementById( 'summary' );
$summary.innerHTML = htmlbuilder.summary( test_results );

var $failed_tests = window.document.getElementById( 'failed-tests' );
$failed_tests.innerHTML = htmlbuilder.passedTests( failed_tests );

var $passed_tests = window.document.getElementById( 'passed-tests' );
$passed_tests.innerHTML = htmlbuilder.passedTests( passed_tests );