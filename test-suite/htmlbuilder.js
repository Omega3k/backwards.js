var buildSummaryInterface
	, buildPassedTestsInterface
	, buildFailedTestsInterface
;

buildSummaryInterface = function ( x ) {
	return '<h1>Test-Suite Summary</h1>'
    + '<span class="total">Total: ' + x.total + '</span>'
    + '<span class="passed">Passed: ' + x.passed + '</span>'
    + '<span class="failed">Failed: ' + x.failed + '</span>';
};

buildPassedTestsInterface = function ( x ) {
	var _i, tests, tests_length, i, val, length = x.length, str = '';

	for ( i = 0; i < length; i++ ) {
		val = x[i];
		// str += '<li><span class="name">' + val.name + '</span><ul>';
		str += '<li><h2>' + val.name + '</h2><ul>';
		tests = val.tests;
		tests_length = tests.length;

		for ( _i = 0; _i < tests_length; _i++ ) {
			str += '<li><span class="number">' + tests[_i].id + '</span>Expected ' 
						+ tests[_i].actual 
						+ ' to equal ' 
						+ tests[_i].expected 
						+ '</li>';
		}

		str += '</ul></li>';
	}

	return '<ul>' + str + '</ul>';
};

buildFailedTestsInterface = function ( x ) {
	return '';
};

module.exports = {
	summary    : buildSummaryInterface,
	passedTests: buildPassedTestsInterface,
	failedTests: buildFailedTestsInterface
};