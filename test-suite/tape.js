define('tape', [], function () {
	var Test, publicApi;

	Test = function (name) {
		this.name  = name;
		this.tests = [];
	};

	Test.prototype.status = 'pending';

	Test.prototype.equal = function(actual, expected) {
		var results = publicApi.results
			, id      = ++results.total;

		var test = {
			id      : id,
			actual  : actual,
			expected: expected
		};

		if ( actual === expected ) {
			results.passed++;
			test.passed = true;
		} else {
			results.failed++;
			test.passed = false;
		}

		this.tests.push( test );
	};

	Test.prototype.end = function() {
		publicApi.results.tests.push(this);
	};

	publicApi = function (string, f) {
		f( new Test( string ) );
	};

	publicApi.results = {
		passed: 0,
		failed: 0,
		total : 0,
		tests : []
	};

	return publicApi;
});