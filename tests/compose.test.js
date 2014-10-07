module.exports = function (test, backwards) {
	var f, compose;
	f = compose = backwards.compose;

	function addOne (x) {
		return x + 1;
	}

	function timesTwo (x) {
		return x * 2;
	}
	
	test('backwards.compose should be a function', function (t) {
		t.equal(typeof f, 'function');
		t.end();
	});

	test('backwards.compose should compose functions correctly', function (t) {
		var nine = compose( addOne, timesTwo )( 4 );
		var ten  = compose( timesTwo, addOne )( 4 );

		t.equal( nine, 9 );
		t.equal( ten, 10 );
		t.end();
	});
};