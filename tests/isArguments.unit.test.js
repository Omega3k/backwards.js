var test        = require('tape')
	, isArguments = require('../src/backwards').isArguments
	, txt         = 'backwards.isArguments should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof isArguments, 'function');
	t.end();
});

test(txt + 'return true if given an Arguments-object', function (t) {
	t.equal( isArguments( arguments ), true );
	t.end();
});

test(txt + 'return false if given anything else', function (t) {
	t.equal( isArguments( [] ), false );
	t.equal( isArguments( new Array() ), false );

	t.equal( isArguments( true ), false );
	t.equal( isArguments( new Boolean() ), false );

	t.equal( isArguments( new Date() ), false );

	t.equal( isArguments( new Error() ), false );
	t.equal( isArguments( new TypeError() ), false );

	t.equal( isArguments( function () {} ), false );
	t.equal( isArguments( new Function() ), false );

	t.equal( isArguments( 1234 ), false );
	t.equal( isArguments( new Number() ), false );

	t.equal( isArguments( {} ), false );
	t.equal( isArguments( new Object() ), false );

	t.equal( isArguments( /./ ), false );
	t.equal( isArguments( new RegExp() ), false );

	t.equal( isArguments( 'string' ), false );
	t.equal( isArguments( new String() ), false );

	t.equal( isArguments( Infinity ), false );
	t.equal( isArguments( NaN ), false );
	t.equal( isArguments( null ), false );
	t.equal( isArguments( void 0 ), false );
	t.end();
});