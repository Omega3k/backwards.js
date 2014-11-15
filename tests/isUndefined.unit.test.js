var test        = require('tape')
	, isUndefined = require('../src/backwards').isUndefined
	, txt         = 'backwards.isUndefined should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof isUndefined, 'function');
	t.end();
});

test(txt + 'return true if given null', function (t) {
	t.equal( isUndefined( void 0 ), true );
	t.end();
});

test(txt + 'return false if given anything else', function (t) {
	t.equal( isUndefined( arguments ), false );

	t.equal( isUndefined( [] ), false );
	t.equal( isUndefined( new Array() ), false );

	t.equal( isUndefined( true ), false );

	t.equal( isUndefined( new Date() ), false );

	t.equal( isUndefined( new Error() ), false );
	t.equal( isUndefined( new TypeError() ), false );

	t.equal( isUndefined( function () {} ), false );
	t.equal( isUndefined( new Function() ), false );

	t.equal( isUndefined( 1234 ), false );
	t.equal( isUndefined( new Number() ), false );

	t.equal( isUndefined( {} ), false );
	t.equal( isUndefined( new Object() ), false );

	t.equal( isUndefined( /./ ), false );
	t.equal( isUndefined( new RegExp() ), false );

	t.equal( isUndefined( 'string' ), false );
	t.equal( isUndefined( new String() ), false );

	t.equal( isUndefined( Infinity ), false );
	t.equal( isUndefined( NaN ), false );
	t.equal( isUndefined( null ), false );
	t.end();
});