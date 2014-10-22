module.exports = function (test, backwards) {
	var reduce = backwards.reduce;
	
	test('backwards.reduce should be a function', function (t) {
		t.equal(typeof reduce, 'function');
		t.end();
	});

	test('backwards.reduce should reduce Arrays down to a single value', function (t) {
		function add (x, y) {
			return x + y;
		}

		var sum = reduce( add, 0 );

		t.equal( sum( [0, 1, 2, 3] ), 6 );
		t.end();
	});

	test('backwards.reduce should reduce Arrays in the \'proper\' order', function (t) {
		function concat (x, y) {
			return x.concat(y);
		}

		var flatten = reduce( concat, [] );

		t.equal( flatten( [[0, 1], [2, 3], [4, 5]] ).toString(), [0, 1, 2, 3, 4, 5].toString() );
		t.end();
	});
};