module.exports = function (test, backwards) {
	var f, compose;
	f = compose = backwards.compose;
	
	test('backwards.compose should be a function', function (t) {
		t.equal(typeof f, 'function');
		t.end();
	});

	test('backwards.compose should compose functions correctly', function (t) {
		var nine, ten;
		function addOne (x) {
			return x + 1;
		}

		function timesTwo (x) {
			return x * 2;
		}

		nine = compose( addOne, timesTwo );
		ten  = compose( timesTwo, addOne );

		t.equal( nine( 4 ), 9 );
		t.equal( ten( 4 ), 10 );
		t.end();
	});
};