var browsers = [];

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

module.exports = function (grunt) {
	grunt.initConfig({
		connect: {
			server: {
				options: {
					base: '',
					port: 9999
				}
			}
		},

		watch: {},

		'saucelabs-jasmine': {
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
		}
	});

	for (var key in grunt.file.readJSON('package.json').devDependencies) {
		if (key !== 'grunt' && key.indexOf('grunt') === 0) {
			grunt.loadNpmTasks(key)
		}
	}

	grunt.registerTask('dev', ['connect', 'watch']);
	grunt.registerTask('test', ['connect', 'saucelabs-jasmine']);
	grunt.registerTask('default', 'dev');
};