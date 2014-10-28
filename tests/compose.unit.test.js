var test    = require('tape')
	, compose = require('../src/backwards').compose
	, txt     = 'backwards.compose should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof compose, 'function');
	t.end();
});

test(txt + 'compose functions correctly', function (t) {
	var nine = compose( addOne, timesTwo )( 4 );
	var ten  = compose( timesTwo, addOne )( 4 );

	t.equal( nine, 9 );
	t.equal( ten, 10 );
	t.end();
});