// Instructions for setting up saucelabs with Jasmine Testing Framework and Travis CI. 
// https://saucelabs.com/javascript/jasmine-js
// http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption

var   browsers = []
	, initConfig = {}
;

function addBrowser (platform, name, version) {
	var obj         = {};
	obj.platform    = platform;
	obj.browserName = name;
	if (version) {
		obj.version = version;
	}
	browsers.push(obj);
}

// https://saucelabs.com/platforms/webdriver
// https://docs.saucelabs.com/reference/rest-api/#jsunit

// http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html

// IOS iPhone / iPad
// =================

addBrowser( 'OS X 10.9', 'iphone' );
addBrowser( 'OS X 10.9', 'ipad' );


// Android
// =======

// addBrowser( 'Linux', 'android', '4.4' );
// browsers.push({
// 	platformName   : 'android',
// 	platformVersion: '4.4',
// 	browserName    : 'browser',
// 	deviceName     : 'Android',
// 	appiumVersion  : '1.3.1'
// });


// Windows 8.1
// ===========

addBrowser( 'Windows 8.1', 'firefox' );
addBrowser( 'Windows 8.1', 'chrome' );
addBrowser( 'Windows 8.1', 'internet explorer', '11' );


// Windows 8
// =========

addBrowser( 'Windows 8', 'internet explorer', '10' );


// Windows 7
// =========

addBrowser( 'Windows 7', 'internet explorer', '9' );


// Windows XP
// ==========

addBrowser( 'Windows XP', 'firefox' );
addBrowser( 'Windows XP', 'chrome' );
addBrowser( 'Windows XP', 'opera' );
addBrowser( 'Windows XP', 'internet explorer', '8' );
addBrowser( 'Windows XP', 'internet explorer', '7' );
addBrowser( 'Windows XP', 'internet explorer', '6' );


// OS X 10.6 Snow Leopard
// ======================

// addBrowser( 'OS X 10.6', 'safari' );


// OS X 10.9 Mavericks
// ===================

addBrowser( 'OS X 10.9', 'firefox' );
addBrowser( 'OS X 10.9', 'chrome' );


// Linux
// =====

addBrowser( 'Linux', 'firefox' );
addBrowser( 'Linux', 'chrome' );
addBrowser( 'Linux', 'opera' );


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
			// 'tests/_tests.min.js': [
			// 	'tests/_tests.js'
			// ]
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