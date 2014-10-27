var test = require('tape')
	, some = require('../src/backwards').some
	, txt  = 'backwards.some should ';

function predicate (x) {
	return x > 10;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof some, 'function');
	t.end();
});

test(txt + 'return false if not some value conforms with the predicate', function (t) {
	t.equal( some( predicate, [2, 5, 8, 1, 4] ), false );
	t.end();
});

test(txt + 'return false if given an empty Array', function (t) {
	t.equal( some( predicate, [] ), false );
	t.end();
});

test(txt + 'return true if not some value conforms with the predicate', function (t) {
	t.equal( some( predicate, [12, 5, 8, 1, 4] ), true );
	t.end();
});