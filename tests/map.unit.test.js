var test = require('tape')
	, map  = require('../src/backwards').map
	, txt  = 'backwards.map should ';

function addOne (x) {
	return x + 1;
}

function timesTwo (x) {
	return x * 2;
}

test(txt + 'be a function', function (t) {
	t.equal(typeof map, 'function');
	t.end();
});

test(txt + 'map over Arrays and not cause side-effects', function (t) {
	var array = [1, 2, 3];

	t.equal( map( addOne, array ).toString(), [2, 3, 4].toString() );
	t.equal( array.toString(), [1, 2, 3].toString() );
	t.end();
});

test(txt + 'map over Objects and not cause side-effects', function (t) {
	var obj = {
		id  : 1,
		name: 'string'
	};

	t.equal( map( addOne, obj ).id, 2 );
	t.equal( map( addOne, obj ).name, 'string1' );
	t.equal( obj.id, 1 );
	t.equal( obj.name, 'string' );
	t.end();
});

test(txt + 'map over Booleans and not cause side-effects', function (t) {
	var bool = true;

	t.equal( map( addOne, bool ), 2 );
	t.equal( bool, true );
	t.end();
});

test(txt + 'map over Numbers and not cause side-effects', function (t) {
	var num = 1;

	t.equal( map( addOne, num ), 2 );
	t.equal( num, 1 );
	t.end();
});

test(txt + 'map over Numbers and not cause side-effects', function (t) {
	var str = 'string';

	t.equal( map( addOne, str ), 'string1' );
	t.equal( str, 'string' );
	t.end();
});