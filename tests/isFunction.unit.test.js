var test       = require('tape')
	, isFunction = require('../src/backwards').isFunction
	, txt        = 'backwards.isFunction should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof isFunction, 'function');
	t.end();
});

test(txt + 'return true if given a Function-object', function (t) {
	t.equal( isFunction( function () {} ), true );
	t.equal( isFunction( new Function() ), true );
	t.end();
});

test(txt + 'return false if given anything else', function (t) {
	t.equal( isFunction( arguments ), false );

	t.equal( isFunction( [] ), false );
	t.equal( isFunction( new Array() ), false );

	t.equal( isFunction( true ), false );

	t.equal( isFunction( new Date() ), false );

	t.equal( isFunction( new Error() ), false );
	t.equal( isFunction( new TypeError() ), false );

	t.equal( isFunction( 1234 ), false );
	t.equal( isFunction( new Number() ), false );

	t.equal( isFunction( {} ), false );
	t.equal( isFunction( new Object() ), false );

	t.equal( isFunction( /./ ), false );
	t.equal( isFunction( new RegExp() ), false );

	t.equal( isFunction( 'string' ), false );
	t.equal( isFunction( new String() ), false );

	t.equal( isFunction( Infinity ), false );
	t.equal( isFunction( NaN ), false );
	t.equal( isFunction( null ), false );
	t.equal( isFunction( void 0 ), false );
	t.end();
});