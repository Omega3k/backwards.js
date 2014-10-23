module.exports = function (test, backwards) {
	var reduce = backwards.reduce
		, txt    = 'backwards.reduce should ';

	function add (x, y) {
		return x + y;
	}

	function concat (x, y) {
		return x.concat(y);
	}

	var sum     = reduce( add, 0 )
		, flatten = reduce( concat, [] );
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof reduce, 'function');
		t.end();
	});

	test(txt + 'reduce Arrays down to a single value', function (t) {
		t.equal( sum( [0, 1, 2, 3] ), 6 );
		t.end();
	});

	test(txt + 'reduce Arrays in the \'proper\' order', function (t) {
		t.equal( flatten( [[0, 1], [2, 3], [4, 5]] ).toString(), [0, 1, 2, 3, 4, 5].toString() );
		t.end();
	});
};