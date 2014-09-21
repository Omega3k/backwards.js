var tape = require( './_tape.mock.js' )
	, test = tape.test
;

test('a simple test', function (t) {
	t.equal(true, true);
	t.end();
});

test('2 + 2 equals 4', function (t) {
	t.equal(2 + 2, 4);
	t.end();
});

test('2 + 2 equals 2', function (t) {
	t.equal(2 + 2, 2);
	t.end();
});

window.global_test_results = tape.getResults();