module.exports = function (test, backwards) {
	var indexOf = backwards.indexOf
		, txt    = 'backwards.indexOf should ';
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof indexOf, 'function');
		t.end();
	});

	test(txt + 'return the correct value ...', function (t) {
		var array = [2, 5, 9];

		t.equal( indexOf(2, 0, array), 0 );
		t.equal( indexOf(7, 0, array), -1 );
		t.equal( indexOf(9, 2, array), 2 );
		t.equal( indexOf(2, -1, array), -1 );
		t.equal( indexOf(2, -3, array), 0 );
		t.equal( indexOf(2, -8, array), 0 );
		t.end();
	});
};