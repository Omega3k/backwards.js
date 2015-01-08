// Instructions for setting up saucelabs with Jasmine Testing Framework and Travis CI. 
// https://saucelabs.com/javascript/jasmine-js
// http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption
// https://saucelabs.com/platforms/webdriver
// https://docs.saucelabs.com/reference/rest-api/#jsunit

// https://github.com/gruntjs/grunt-contrib-yuidoc
// http://yui.github.io/yuidoc/syntax

// http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html

var grunt      = require('grunt')
  , browsers   = []
  , initConfig = {}
  , license    = grunt.file.read('LICENSE')
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


// IOS iPhone / iPad
// =================

addBrowser( 'OS X 10.9', 'iphone' );
addBrowser( 'OS X 10.9', 'ipad' );


// Android
// =======

// addBrowser( 'Linux', 'android', '4.4' );
// browsers.push({
//  platformName   : 'android',
//  platformVersion: '4.4',
//  browserName    : 'browser',
//  deviceName     : 'Android',
//  appiumVersion  : '1.3.1'
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
      // hostname: 'localhost',
      hostname: '0.0.0.0',
      port: 9999
    }
  }
};

// Watch-task
initConfig.watch = {
  tests: {
    // files: ['tests/**/*.test.js', 'src/**/*.js'],
    files: ['src/specs/**/*.coffee'],
    // tasks: ['browserify', 'nodeTests']
    tasks: ['coffee:tests']
  },

  test_suite_coffee: {
    files: ['test-suite/**/*.coffee'],
    tasks: ['coffee']
  },

  docs: {
    files: ['build/backwards.dev.js'],
    tasks: ['jshint:backwards_dev', 'yuidoc']
  },

  gruntfile: {
    files: ['Gruntfile.js'],
    tasks: ['jshint:gruntfile']
  }, 

  backwards_dev: {
    // files: ['src/backwards.*.coffee', 'src/EventStream.coffee'],
    files: ['src/backwards.coffee'],
    tasks: ['coffee:backwards_dev', 'jshint:backwards_dev']
  }
};

// Saucelabs Custom
initConfig['saucelabs-custom'] = {
  all: {
    options: {
      urls         : ['http://0.0.0.0:9999/test-suite/'],
      tunnelTimeout: 5,
      build        : process.env.TRAVIS_JOB_ID,
      concurrency  : 6,
      browsers     : browsers,
      testname     : 'backwards.js',
      tags         : ['master']
    }
  }
};

// Browserify
initConfig.browserify = {
  dist: {
    files: {
      // 'build/backwards.min.js': ['src/backwards.js'],
      // 'tests/_tests.min.js': [
      //  'tests/_tests.js'
      // ]
    }
  }
};

initConfig.yuidoc = {
  compile: {
    name       : 'backwards.js',
    description: 'A set of utility functions for functional programming in JavaScript',
    version    : '0.0.0',
    url        : 'https://github.com/Omega3k/backwards.js',
    options: {
      paths      : 'src',
      outdir     : 'docs',
      // themedir   : 'path/to/custom/theme',
      linkNatives: true
    }
  }
};

// initConfig.compress = {
//   backwards: {
//     options: {
//       mode: 'gzip'
//     },
//     expand: true,
//     cwd   : 'src/',
//     src   : ['**/*'],
//     dest  : 'public/'
//   }
// };

initConfig.uglify = {
  options: {
    banner: '/*\n' + license + '\n\n' + 'Source-Code: https://github.com/Omega3k/backwards.js\n*/\n\n\n',
    mangle: {
      except: ['jQuery', 'Backbone']
    }
  },

  backwards: {
    files: {
      // 'build/backwards.min.js': ['src/backwards.js']
      'build/backwards.min.js': ['build/backwards.dev.js']
    }
  }
};

initConfig.jshint = {
  options: {
    // '-W015' : true,
    '-W030' : true,
    eqeqeq  : true,
    eqnull  : true,
    laxcomma: true,
    undef   : true,
    node    : true,
    globals: {
      jQuery  : true,
      'window': true,
      module  : true,
      exports : true,
      define  : true,
      require : true
    }
  },
  backwards_dev  : ['build/backwards.dev.js'],
  // backwards_build: ['build/backwards.min.js'],
  gruntfile      : ['Gruntfile.js'],
  // build          : ['build/**/*.js']
};

initConfig.coffee = {
  backwards_dev: {
    options: {
      join     : true,
      sourceMap: true
    },
    files: {
      'build/backwards.dev.js': ['src/backwards.coffee'],
      // 'build/backwards.EventStream.min.js': ['src/backwards.EventStream.coffee'],
      // 'build/EventStream.min.js': ['src/EventStream.coffee'],
      'test-suite/ux.js': ['test-suite/ux.coffee']
    }
  },

  tests: {
    options: {
      join: true
    },
    files: {
      '_tmp/tests.js': ['src/specs/**/*.coffee']
    }
  }
};


module.exports = function (grunt) {
  var exec         = require('child_process').exec
    , globSync     = require('glob').sync
    , readJSONFile = grunt.file.readJSON
    , _            = grunt.util._
    , pkg          = readJSONFile('package.json')
  ;

  function loadConfig (path) {
    var result = {}
      , name, filenames
    ;

    filenames = globSync('*', { cwd: path });
    _.map(filenames, function (filename) {
      name = filename.replace(/\.js$/, '');
      result[name] = require(path + filename);
    });

    return result;
  }

  grunt.initConfig( initConfig );

  _.map(pkg.devDependencies, function (val, key, obj) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks( key );
    }
  });

  grunt.registerTask('default', 'dev');
  grunt.registerTask('dev', ['build', 'connect', 'watch']);
  grunt.registerTask('test', ['browserify:dist', 'connect', 'saucelabs-custom']);
  grunt.registerTask('build', ['coffee', 'browserify:dist', 'jshint', 'yuidoc', 'uglify']);
  grunt.registerTask('nodeTests', 'Run the tests in the command-line using node', function () {
    // grunt.util.spawn({
    //  cmd: ['npm run-script cmd']
    // }, function done (error, result, code) {
    //  var log = grunt.log.ok;
    //  if (error) { log('Error: ' + error); }
    //  if (result) { log('Result: ' + result); }
    //  if (code) { log('Code: ' + code); }
    //  grunt.log.ok('All tests were successfull :)');
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
};