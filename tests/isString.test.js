module.exports = function (test, backwards) {
	var f = backwards.isString;
	
	test('backwards.isString should be a function', function (t) {
		t.equal(typeof f, 'function');
		t.end();
	});

	test('it should return false if passed an Arguments-object', function (t) {
		t.equal(f( arguments ), false);
		t.end();
	});

	test('it should return false if passed an Array', function (t) {
		t.equal(f( new Array() ), false);
		t.equal(f( [] ), false);
		t.end();
	});

	test('it should return false if passed a Boolean', function (t) {
		t.equal(f( true ), false);
		t.end();
	});

	test('it should return false if passed a Function', function (t) {
		t.equal(f( new Function() ), false);
		t.equal(f( function () {} ), false);
		t.end();
	});

	test('it should return false if passed a Number', function (t) {
		t.equal(f( new Number() ), false);
		t.equal(f( 1234 ), false);
		t.end();
	});

	test('it should return false if passed an Object', function (t) {
		t.equal(f( new Object() ), false);
		t.equal(f( {} ), false);
		t.end();
	});

	test('it should return true if passed a String', function (t) {
		t.equal(f( new String() ), true);
		t.equal(f( 'string' ), true);
		t.end();
	});

	test('it should return false if passed a Null', function (t) {
		t.equal(f( null ), false);
		t.end();
	});

	test('it should return false if passed an Undefined', function (t) {
		t.equal(f( undefined ), false);
		t.end();
	});
};