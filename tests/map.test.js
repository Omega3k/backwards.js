module.exports = function (test, backwards) {
	var map  = backwards.map
		, s    = 'backwards.map '
		, arg  = [1, 2, 3]
		, arr  = [ 1, 2, 3 ]
		, obj  = { id: 1, name: 'string' }
		, bool = true
		, num  = 1
		, str  = 'string'
		, result
	;

	function addOne (x) {
		return x + 1;
	}

	function timesTwo (x) {
		return x * 2;
	}
	
	test(s+'should be a function', function (t) {
		t.equal(typeof map, 'function');
		t.end();
	});

	test(s+'should map over Arrays', function (t) {
		result = map( addOne, arr );
		t.equal( result[0], 2 );
		t.equal( result[1], 3 );
		t.equal( result[2], 4 );
		t.end();
	});

	test(s+'should not cause side-effects on given Arrays', function (t) {
		result = map( addOne, arr );
		t.equal( arr[0], 1 );
		t.equal( arr[1], 2 );
		t.equal( arr[2], 3 );
		t.end();
	});

	test(s+'should map over Objects', function (t) {
		result = map( addOne, obj );
		t.equal( result.id, 2 );
		t.equal( result.name, 'string1' );
		t.end();
	});

	test(s+'should not cause side-effects on given Objects', function (t) {
		result = map( addOne, obj );
		t.equal( obj.id, 1 );
		t.equal( obj.name, 'string' );
		t.end();
	});

	test(s+'should map over Booleans', function (t) {
		result = map( addOne, bool );
		t.equal( result, 2 );
		t.end();
	});

	test(s+'should not cause side-effects on given Booleans', function (t) {
		result = map( addOne, bool );
		t.equal( bool, true );
		t.end();
	});

	test(s+'should map over Numbers', function (t) {
		result = map( addOne, num );
		t.equal( result, 2 );
		t.end();
	});

	test(s+'should not cause side-effects on given Numbers', function (t) {
		result = map( addOne, num );
		t.equal( num, 1 );
		t.end();
	});

	test(s+'should map over Strings', function (t) {
		result = map( addOne, str );
		t.equal( result, 'string1' );
		t.end();
	});

	test(s+'should not cause side-effects on given Strings', function (t) {
		result = map( addOne, str );
		t.equal( str, 'string' );
		t.end();
	});

};