module.exports = function (test, backwards) {
	var either = backwards.either
		, txt    = 'backwards.either should ';
	
	test(txt + 'be a function', function (t) {
		t.equal(typeof either, 'function');
		t.end();
	});

	test(txt + 'do the correct thing', function (t) {
		t.equal( either(123, void 0), 123 );
		t.equal( either(123, null), 123 );
		t.equal( either(123, 234), 234 );
		t.end();
	});
};

// var test   = require('tape')
// 	, b      = require('../src/backwards.js')
// 	, either = b.either
// 	, txt    = 'backwards.either should ';

// test(txt + 'be a function', function (t) {
// 	t.equal( typeof either, 'function' );
// 	t.end();
// });

// test(txt + 'do the correct thing', function (t) {
// 	t.equal( either(123, void 0), 123 );
// 	t.equal( either(123, 234), 234 );
// 	t.end();
// });