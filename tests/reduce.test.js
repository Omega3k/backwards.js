module.exports = function (test, backwards) {
	var reduce = backwards.reduce;

	function add (a, b) {
		return a + b;
	}

	function concat (x, y) {
		return x.concat(y);
	}
	
	test('backwards.reduce should be a function', function (t) {
		t.equal(typeof reduce, 'function');
		t.end();
	});

	test('backwards.reduce should reduce Arrays down to a single value', function (t) {
		var sum     = reduce( add, 0 );
		var flatten = reduce( concat, [] );

		var arrayMap = function (f, x) {
			return reduce(function (acc, val, i, arr) {
				acc[i] = f(val, i, arr);
				return acc;
			}, [], x);
		}.autoCurry();

		var arrOne = [0, 1, 2, 3];
		var arrTwo = arrayMap(function (val, i) {
			return val + 1;
		}, arrOne);

		t.equal( sum( [0, 1, 2, 3] ), 6 );
		t.equal( flatten( [[0, 1], [2, 3], [4, 5]] ).toString(), [0, 1, 2, 3, 4, 5].toString() );

		t.equal( arrOne.toString(), [0, 1, 2, 3].toString() );
		t.equal( arrTwo.toString(), [1, 2, 3, 4].toString() );
		t.end();
	});
};