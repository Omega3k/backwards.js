module.exports = function (test, backwards) {
	var filter = backwards.filter
		, txt    = 'backwards.filter should ';

	function isBigEnough (x) {
		return x > 10;
	}
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof filter, 'function');
		t.end();
	});

	test(txt + 'filter out low numbers', function (t) {
		var bigNumbers = filter( isBigEnough );

		t.equal(
			bigNumbers( [12, 5, 8, 130, 44] ).toString(), 
			[12, 130, 44].toString()
		);
		t.end();
	});
};