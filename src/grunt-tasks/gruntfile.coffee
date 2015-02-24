# Instructions for setting up saucelabs with Jasmine Testing Framework 
# and Travis CI. 
# https://saucelabs.com/javascript/jasmine-js
# http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption
# https://saucelabs.com/platforms/webdriver
# https://docs.saucelabs.com/reference/rest-api/#jsunit

# https://github.com/gruntjs/grunt-contrib-yuidoc
# http://yui.github.io/yuidoc/syntax

# http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
# http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/


"use strict"

globSync     = require( "glob" ).sync
timegrunt    = require "time-grunt"
fs           = require "fs"
path         = require "path"
_            = require "backwards"
curry        = _.curry
extend       = _.extend
forEach      = _.forEach
indexOf      = _.indexOf
contains     = _.contains
map          = _.map
reduce       = _.reduce

grunt        = require "grunt"
readFile     = grunt.file.read
readJSONFile = grunt.file.readJSON
readDirectory = fs.readdir

# LICENSE      = readFile "LICENSE"
package_json = readJSONFile "package.json"


replace     = curry (regexp, string, xs) -> xs.replace regexp, string
removeExt   = replace /.coffee$/, ""
isGruntTask = contains "grunt", 0

loadGruntTasksFromPath = (path) ->
  reduce (acc, filename) ->
    # acc[ removeExt filename ] = require path + filename
    acc[ filename ] = require path + filename
    acc
  , {}, fs.readdirSync path
  # , {}, globSync "*", cwd: path

  # browserify: 
  #   dist: 
  #     files: 
  #       "build/backwards.min.js": ["src/backwards.js"]

  # compress:
  #   backwards_zip:
  #     options:
  #       mode: "gzip"
  #     expand: true
  #     cwd   : "src/"
  #     src   : "**/*"
  #     dest  : "public/"


module.exports = (grunt) ->
  timegrunt grunt
  grunt.initConfig loadGruntTasksFromPath "src/gruntfile"

  forEach (value, key, object) ->
    if key isnt "grunt" and isGruntTask key
      grunt.loadNpmTasks key
    return
  , package_json.devDependencies

  grunt.loadNpmTasks "time-grunt"

  grunt.registerTask "default", "dev"
  
  grunt.registerTask "dev", [
    "build"
    "connect"
    "watch"
  ]

  grunt.registerTask "build", [
    "coffee"
    "jshint"
    "yuidoc"
    "uglify"
  ]

  grunt.registerTask "test", [
    # "build"
    "connect"
    "saucelabs-custom"
  ]