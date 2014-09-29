// http://www.codewars.com/kata/operator-overload/solutions/javascript?show-solutions=1
// var Foo = function(value) { this.val = value; }
// Foo.prototype.valueOf = function() { return this.val; }

var tape        = require( './_tape.mock.js' )
	, test        = tape.test

	, backwards   = require( '../src/backwards.js' )

	, isArguments = require( './isArguments.test.js' )( test, backwards )
	, isArray     = require( './isArray.test.js' )( test, backwards )
	, isBoolean   = require( './isBoolean.test.js' )( test, backwards )
	, isFunction  = require( './isFunction.test.js' )( test, backwards )
	, isNull      = require( './isNull.test.js' )( test, backwards )
	, isNumber    = require( './isNumber.test.js' )( test, backwards )
	, isObject    = require( './isObject.test.js' )( test, backwards )
	// , isString    = require( './isString.test.js' )( test, backwards )
	// , isUndefined = require( './isUndefined.test.js' )( test, backwards )

	// , compose     = require( './compose.test.js' )( test, backwards )
;

window.global_test_results = tape.getResults();