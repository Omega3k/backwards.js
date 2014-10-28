var test     = require('tape')
	, isString = require('../src/backwards').isString
	, txt      = 'backwards.isString should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof isString, 'function');
	t.end();
});

test(txt + 'return true if given a String-object', function (t) {
	t.equal( isString( 'string' ), true );
	t.equal( isString( new String() ), true );
	t.end();
});

test(txt + 'return false if given anything else', function (t) {
	t.equal( isString( arguments ), false );

	t.equal( isString( [] ), false );
	t.equal( isString( new Array() ), false );

	t.equal( isString( true ), false );

	t.equal( isString( new Date() ), false );

	t.equal( isString( new Error() ), false );
	t.equal( isString( new TypeError() ), false );

	t.equal( isString( function () {} ), false );
	t.equal( isString( new Function() ), false );

	t.equal( isString( 1234 ), false );
	t.equal( isString( new Number() ), false );

	t.equal( isString( {} ), false );
	t.equal( isString( new Object() ), false );

	t.equal( isString( /./ ), false );
	t.equal( isString( new RegExp() ), false );

	t.equal( isString( Infinity ), false );
	t.equal( isString( NaN ), false );
	t.equal( isString( null ), false );
	t.equal( isString( void 0 ), false );
	t.end();
});