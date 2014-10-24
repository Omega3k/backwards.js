module.exports = function (test, backwards) {
	var every  = backwards.every
		, txt    = 'backwards.every should '
		, passed = every( isBigEnough )( [12, 54, 18, 130, 44] )
		, failed = every( isBigEnough )( [12, 5, 8, 130, 44] )
		, empty  = every( isBigEnough )( [] );

	function isBigEnough (x, i, arr) {
		return x > 10;
	}
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof every, 'function');
		t.end();
	});

	test('return false if not every number is big enough', function (t) {
		t.equal( failed, false );
		t.end();
	});

	test('return true if every number is big enough', function (t) {
		t.equal( passed, true );
		t.end();
	});

	test('return true if given an empty Array', function (t) {
		t.equal( empty, true );
		t.end();
	});
};