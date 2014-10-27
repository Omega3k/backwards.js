var test    = require('tape')
	, maybe   = require('../src/backwards').maybe
	, txt     = 'backwards.maybe should ';

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof maybe, 'function');
	t.end();
});

test(txt + 'execute the supplied function if given something that is not null or undefined', function (t) {
	t.equal( maybe( timesTwo, 123 ), 246 );
	t.end();
});

test(txt + 'not execute the supplied function if given something that is null or undefined', function (t) {
	t.equal( maybe( timesTwo, void 0 ), void 0 );
	t.equal( maybe( timesTwo, null ), void 0 );
	t.end();
});