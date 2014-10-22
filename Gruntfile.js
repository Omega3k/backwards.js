// Instructions for setting up saucelabs with Jasmine Testing Framework and Travis CI. 
// https://saucelabs.com/javascript/jasmine-js
// http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption

var   browsers = []
	, initConfig = {}
;

// https://saucelabs.com/platforms/webdriver
// https://docs.saucelabs.com/reference/rest-api/#jsunit

// http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html

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
			hostname: 'localhost',
			port: 9999
		}
	}
};

// Watch-task
initConfig.watch = {
	tests: {
		files: ['tests/**/*.test.js', 'src/**/*.js'],
		tasks: ['browserify', 'nodeTests']
	}
};

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

// var myTerminal = require("child_process").exec,
//     commandToBeExecuted = "sh myCommand.sh";

// myTerminal(commandToBeExecuted, function(error, stdout, stderr) {
//     if (!error) {
//          //do something
//     }
// });

// grunt.util.spawn({
//   cmd: ['rm'],
//   args: ['-rf', '/tmp'],
// }, function done() {
//   grunt.log.ok('/tmp deleted');
// });

// grunt.registerTask('jquery', "download jquery bundle", function() {
//   shell.exec('wget http://jqueryui.com/download/jquery-ui-1.7.3.custom.zip');
// });

module.exports = function (grunt) {
	var exec = require('child_process').exec
		, pkg = grunt.file.readJSON('package.json')
		, _   = grunt.util._
		, loadConfig, config
	;

	loadConfig = function (path) {
		var glob   = require('glob')
			, result = {}
			, name, configs
		;

		configs = glob.sync('*', { cwd: path });

		_.map(configs, function (val, key, obj) {
			name = val.replace(/\.js$/, '');
			result[ name ] = require( path + val );
		});

		return result;
	};

	grunt.initConfig( initConfig );

	_.map(pkg.devDependencies, function (val, key, obj) {
		if (key !== 'grunt' && key.indexOf('grunt') === 0) {
			grunt.loadNpmTasks( key );
		}
	});

	grunt.registerTask('dev', ['browserify:dist', 'connect', 'watch']);
	grunt.registerTask('test', ['browserify:dist', 'connect', 'saucelabs-custom']);
	grunt.registerTask('build', ['browserify:dist']);
	grunt.registerTask('nodeTests', 'Run the tests in the command-line using node', function () {
		// grunt.util.spawn({
		// 	cmd: ['npm run-script cmd']
		// }, function done (error, result, code) {
		// 	var log = grunt.log.ok;
		// 	if (error) { log('Error: ' + error); }
		// 	if (result) { log('Result: ' + result); }
		// 	if (code) { log('Code: ' + code); }
		// 	grunt.log.ok('All tests were successfull :)');
		// });

		exec('npm run-script cmd', function(error, stdout, stderr) {
	    if (!error) {
	    	grunt.log.ok('asljdaslkdn');
	    } else {
	    	grunt.log.warn('Error: ' + error);
	    }
	    grunt.log.ok(stdout, stderr);
		});
	});

	grunt.registerTask('default', 'dev');
};