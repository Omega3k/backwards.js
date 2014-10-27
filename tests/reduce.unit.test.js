var test   = require('tape')
	, reduce = require('../src/backwards').reduce
	, txt    = 'backwards.reduce should ';

function add (a, b) {
	return a + b;
}

function append (a, b) {
	return a.concat(b);
}

test(txt + 'be a function', function (t) {
	t.equal(typeof reduce, 'function');
	t.end();
});

test(txt + 'reduce Arrays down to a single value', function (t) {
	t.equal( reduce( add, 0, [0, 1, 2, 3] ), 6 );
	t.end();
});

test(txt + 'reduce Arrays in the \'proper\' order', function (t) {
	t.equal( 
		reduce( append, [], [[0, 1], [2, 3], [4, 5]] ).toString(), 
		[0, 1, 2, 3, 4, 5].toString() );
	t.end();
});