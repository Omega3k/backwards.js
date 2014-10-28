var test   = require('tape')
	, isNull = require('../src/backwards').isNull
	, txt    = 'backwards.isNull should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof isNull, 'function');
	t.end();
});

test(txt + 'return true if given null', function (t) {
	t.equal( isNull( null ), true );
	t.end();
});

test(txt + 'return false if given anything else', function (t) {
	t.equal( isNull( arguments ), false );

	t.equal( isNull( [] ), false );
	t.equal( isNull( new Array() ), false );

	t.equal( isNull( true ), false );

	t.equal( isNull( new Date() ), false );

	t.equal( isNull( new Error() ), false );
	t.equal( isNull( new TypeError() ), false );

	t.equal( isNull( function () {} ), false );
	t.equal( isNull( new Function() ), false );

	t.equal( isNull( 1234 ), false );
	t.equal( isNull( new Number() ), false );

	t.equal( isNull( {} ), false );
	t.equal( isNull( new Object() ), false );

	t.equal( isNull( /./ ), false );
	t.equal( isNull( new RegExp() ), false );

	t.equal( isNull( 'string' ), false );
	t.equal( isNull( new String() ), false );

	t.equal( isNull( Infinity ), false );
	t.equal( isNull( NaN ), false );
	t.equal( isNull( void 0 ), false );
	t.end();
});