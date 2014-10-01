var test       = require( 'tape' )
	, cache      = []
	, num_total  = 0
	, num_passed = 0
	, num_failed = 0
	, F
;

F = function () {};

F.prototype = {
	status: 'pending',

	equal: function (actual, expected) {
		var test = {};
		num_total++;

		test.id = num_total;
		test.actual = actual;
		test.expected = expected;

		if ( actual === expected ) {
			num_passed++;
			test.passed = true;
		} else {
			num_failed++;
			test.passed = false;
		}

		this.tests.push( test );
	},

	end: function () {
		cache.push(this);
	}
};

module.exports.test = function ( string, f ) {
	var _f   = new F();
	_f.name  = string;
	_f.tests = [];
	// _f.timestamp = +new Date();

	f( _f );
	test( string, f );
};

module.exports.getResults = function () {
	var result = [];

	cache.forEach(function (x, i, array) {
		result.push({
			name: x.name,
			result: x.status === 'passed',
			message: 'Expected ' + x.actual + ' to equal ' + x.expected
		});
	});

	return {
		passed  : num_passed,
		failed  : num_failed,
		total   : num_total,
		// duration: 'TODO Duration',
		// tests   : result
		tests   : cache
	};
};

// module.exports = return_obj;

// if (define) {
// 	define('tape', [], function () {
// 		return return_obj;
// 	});
// }