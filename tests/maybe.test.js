module.exports = function (test, backwards) {
	var maybe  = backwards.maybe
		, txt    = 'backwards.maybe should ';
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof maybe, 'function');
		t.end();
	});

	test(txt + 'do the correct thing', function (t) {
		var doIfExsists = maybe( timesTwo );

		function timesTwo (x) {
			return x * 2;
		}

		t.equal( doIfExsists(123), 246 );
		t.equal( doIfExsists(void 0), void 0 );
		t.equal( doIfExsists(null), void 0 );
		t.end();
	});
};