// Instructions for setting up saucelabs with Jasmine Testing Framework and Travis CI. 
// https://saucelabs.com/javascript/jasmine-js
// http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption

var   browsers = []
	, initConfig = {}
;

browsers.push({
	browserName: 'firefox',
	version    : '19',
	platform   : 'XP'
});

browsers.push({
	browserName: 'chrome',
	platform   : 'XP'
});

browsers.push({
	browserName: 'chrome',
	platform   : 'linux'
});

browsers.push({
	browserName: 'internet explorer',
	version    : '10',
	platform   : 'WIN8'
});

browsers.push({
	browserName: 'internet explorer',
	version    : '9',
	platform   : 'VISTA'
});

browsers.push({
	browserName: 'opera',
	version    : '12',
	platform   : 'Windows 2008'
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
			urls: ['http://0.0.0.0:9999/tests/_tests.html'],
			tunnelTimeout: 5,
			build: process.env.TRAVIS_JOB_ID,
			concurrency: 3,
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
				// '../src/backwards.js',
				'tests/**/*.js',
				'!tests/_tests.min.js'
			]
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