module.exports = function (test, backwards) {
	var some   = backwards.some
		, txt    = 'backwards.some should '
		, passed = some( isBigEnough )( [12, 5, 8, 1, 4] )
		, failed = some( isBigEnough )( [2, 5, 8, 1, 4] );

	function isBigEnough (x, i, arr) {
		return x > 10;
	}
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof some, 'function');
		t.end();
	});

	test('return false if not some number is big enough', function (t) {
		t.equal( failed, false );
		t.end();
	});

	test('return true if some number is big enough', function (t) {
		t.equal( passed, true );
		t.end();
	});

	test('return false if given an empty Array', function (t) {
		t.equal( some(isBigEnough, []), false );
		t.end();
	});
};