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
		this.actual   = actual;
		this.expected = expected;
		num_total++;

		if (actual === expected) {
			this.status = 'passed';
			num_passed++;
		} else {
			this.status = 'failed';
			num_failed++;
		}
	},

	end: function () {
		// this.duration = +new Date() - this.timestamp;
		if (this.status === 'passed') {
			// num_passed++;
		} else if (this.status === 'failed') {
			// num_failed++;
		} else {
			throw new Error('Test neither passed nor failed');
		}

		cache.push(this);
	}
};

module.exports.test = function ( string, f ) {
	var _f  = new F();
	_f.id   = cache.length;
	_f.name = string;
	// _f.timestamp = +new Date();

	test( string, f(_f) );
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
		tests   : result
	};
};