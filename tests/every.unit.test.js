var test  = require('tape')
	, every = require('../src/backwards').every
	, txt   = 'backwards.every should ';

function predicate (x) {
	return x > 10;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof every, 'function');
	t.end();
});

test(txt + 'return false if not every value conforms with the predicate', function (t) {
	t.equal( every( predicate, [12, 5, 8, 130, 44] ), false );
	t.end();
});

test(txt + 'return true if every value conforms with the predicate', function (t) {
	t.equal( every( predicate, [12, 54, 18, 130, 44] ), true );
	t.end();
});

test(txt + 'return true if given an empty Array', function (t) {
	t.equal( every( predicate, [] ), true );
	t.end();
});