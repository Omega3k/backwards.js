var test   = require('tape')
	, either = require('../src/backwards').either
	, txt    = 'backwards.either should ';

test(txt + 'be a function', function (t) {
	t.equal(typeof either, 'function');
	t.end();
});

test(txt + 'return the first value if the second one does not exists', function (t) {
	t.equal( either(123, void 0), 123 );
	t.equal( either(123, null), 123 );
	t.end();
});

test(txt + 'return the second value if it exists', function (t) {
	t.equal( either(123, 456), 456 );
	t.end();
});