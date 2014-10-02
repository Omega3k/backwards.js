// Instructions for setting up saucelabs with Jasmine Testing Framework and Travis CI. 
// https://saucelabs.com/javascript/jasmine-js
// http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption

var   browsers = []
	, initConfig = {}
;

// https://saucelabs.com/platforms/webdriver

// IOS iPhone / iPad
// =================

browsers.push({
	browserName: 'iphone',
	platform   : 'OS X 10.9'
});

browsers.push({
	browserName: 'ipad',
	platform   : 'OS X 10.9'
});

// Android
// =======

browsers.push({
	browserName: 'android',
	version    : '4.4',
	platform   : 'Linux'
});

// Windows 8.1
// ===========

browsers.push({
	browserName: 'firefox',
	platform   : 'Windows 8.1'
});

browsers.push({
	browserName: 'chrome',
	platform   : 'Windows 8.1'
});

browsers.push({
	browserName: 'internet explorer',
	version    : '11',
	platform   : 'Windows 8.1'
});

// Windows 8
// =========

browsers.push({
	browserName: 'internet explorer',
	version    : '10',
	platform   : 'Windows 8'
});

// Windows 7
// =========

browsers.push({
	browserName: 'internet explorer',
	version    : '9',
	platform   : 'Windows 7'
});

// Windows XP
// ==========

browsers.push({
	browserName: 'firefox',
	platform   : 'Windows XP'
});

browsers.push({
	browserName: 'chrome',
	platform   : 'Windows XP'
});

browsers.push({
	browserName: 'opera',
	platform   : 'Windows XP'
});

browsers.push({
	browserName: 'internet explorer',
	version    : '8',
	platform   : 'Windows XP'
});

browsers.push({
	browserName: 'internet explorer',
	version    : '7',
	platform   : 'Windows XP'
});

browsers.push({
	browserName: 'internet explorer',
	version    : '6',
	platform   : 'Windows XP'
});

// OS X 10.6 Snow Leopard
// ======================

browsers.push({
	browserName: 'safari',
	platform   : 'OS X 10.6'
});

// OS X 10.9 Mavericks
// ===================

browsers.push({
	browserName: 'firefox',
	platform   : 'OS X 10.9'
});

browsers.push({
	browserName: 'chrome',
	platform   : 'OS X 10.9'
});


// Linux
// =====

browsers.push({
	browserName: 'firefox',
	platform   : 'Linux'
});

browsers.push({
	browserName: 'chrome',
	platform   : 'Linux'
});

browsers.push({
	browserName: 'opera',
	platform   : 'Linux'
});


// Connect-server
initConfig.connect = {
	server: {
		options: {
			base: '',
			port: 9999
		}
	}
};

// Watch-task
initConfig.watch = {};

// Saucelabs Jasmine
initConfig['saucelabs-jasmine'] = {
	all: {
		options: {
			urls: ['http://0.0.0.0:9999/test-jasmine/SpecRunner.html'],
			tunnelTimeout: 5,
			build: process.env.TRAVIS_JOB_ID,
			concurrency: 3,
			browsers: browsers,
			testname: 'backwards.js',
			tags: ['master']
		}
	}
};

// Saucelabs Custom
initConfig['saucelabs-custom'] = {
	all: {
		options: {
			urls: ['http://0.0.0.0:9999/test-suite/'],
			tunnelTimeout: 5,
			build: process.env.TRAVIS_JOB_ID,
			concurrency: 6,
			browsers: browsers,
			testname: 'backwards.js',
			tags: ['master']
		}
	}
};

// Browserify
initConfig.browserify = {
	dist: {
		files: {
			// 'build/backwards.min.js': ['src/backwards.js'],
			'tests/_tests.min.js': [
				// 'tests/**/*.js',
				// '!tests/**/*.unit.test.js',
				// '!tests/_tests.min.js',
				// '!tests/window.require-tape.js',
				// '!tests/require-tape.js'
				'tests/_tests.js'
			]

			// , 'tests/require-tape.js': [
			// 	// './node_modules/tape/index.js',
			// 	// 'tests/almond.js',
			// 	'tests/_tape.mock.js'
			// 	// 'tests/window.require-tape.js'
			// ]

			// , 'tests/tests.bundle.js': ['tests/**/*.unit.test.js']
		}
	}
};

module.exports = function (grunt) {
	var pkg = grunt.file.readJSON('package.json')
		, _   = grunt.util._
	;

	grunt.initConfig( initConfig );

	_.map(pkg.devDependencies, function (val, key, obj) {
		if (key !== 'grunt' && key.indexOf('grunt') === 0) {
			grunt.loadNpmTasks( key );
		}
	});

	grunt.registerTask('dev', ['browserify:dist', 'connect', 'watch']);
	grunt.registerTask('test', ['browserify:dist', 'connect', 'saucelabs-custom']);
	grunt.registerTask('build', ['browserify:dist']);

	grunt.registerTask('default', 'dev');
};