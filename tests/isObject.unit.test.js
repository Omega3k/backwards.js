var test     = require('tape')
	, isObject = require('../src/backwards').isObject
	, txt      = 'backwards.isObject should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof isObject, 'function');
	t.end();
});

test(txt + 'return true if given an Object', function (t) {
	t.equal( isObject( {} ), true );
	t.equal( isObject( new Object() ), true );
	t.end();
});

test(txt + 'return false if given anything else', function (t) {
	t.equal( isObject( arguments ), false );

	t.equal( isObject( [] ), false );
	t.equal( isObject( new Array() ), false );

	t.equal( isObject( true ), false );

	t.equal( isObject( new Date() ), false );

	t.equal( isObject( new Error() ), false );
	t.equal( isObject( new TypeError() ), false );

	t.equal( isObject( function () {} ), false );
	t.equal( isObject( new Function() ), false );

	t.equal( isObject( 1234 ), false );
	t.equal( isObject( new Number() ), false );

	t.equal( isObject( /./ ), false );
	t.equal( isObject( new RegExp() ), false );

	t.equal( isObject( 'string' ), false );
	t.equal( isObject( new String() ), false );

	t.equal( isObject( Infinity ), false );
	t.equal( isObject( NaN ), false );
	t.equal( isObject( null ), false );
	t.equal( isObject( void 0 ), false );
	t.end();
});