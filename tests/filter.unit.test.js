var test   = require('tape')
	, filter = require('../src/backwards').filter
	, txt    = 'backwards.filter should ';

function predicate (x) {
	return x > 10;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof filter, 'function');
	t.end();
});

test(txt + 'filter based on a predicate', function (t) {
	t.equal( 
		filter( predicate, [12, 5, 8, 130, 44] ).toString(), 
		[12, 130, 44].toString() );
	t.end();
});