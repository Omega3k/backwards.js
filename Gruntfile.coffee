# Instructions for setting up saucelabs with Jasmine Testing Framework 
# and Travis CI. 
# https://saucelabs.com/javascript/jasmine-js
# http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption
# https://saucelabs.com/platforms/webdriver
# https://docs.saucelabs.com/reference/rest-api/#jsunit

# https://github.com/gruntjs/grunt-contrib-yuidoc
# http://yui.github.io/yuidoc/syntax

# http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
# http://www.jayway.com/2014/01/20/clean-grunt/
# http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/


"use strict"

_            = require "backwards"
compose      = _.compose
curry        = _.curry
forEach      = _.forEach
contains     = _.contains
map          = _.map
reduce       = _.reduce

timegrunt    = require "time-grunt"
fs           = require "fs"
readDir      = fs.readdirSync
readFile     = fs.readFileSync
readJSONFile = compose JSON.parse, readFile

LICENSE      = readFile "LICENSE"
package_json = readJSONFile "package.json"


replace      = curry (regexp, string, xs) -> xs.replace regexp, string
removeExt    = replace /.coffee$/, ""

loadGruntTasksFromPath = (path) ->
  reduce (acc, filename) ->
    acc[ filename ] = require "#{ path }/#{ filename }"
    acc
  , {}, map removeExt, readDir path


containsGrunt = contains "grunt-", 0

loadNpmTasks = (grunt, npm_tasks) ->
  forEach (value, key) ->
    if containsGrunt key
      grunt.loadNpmTasks key
      return
  , npm_tasks


module.exports = (grunt) ->
  timegrunt grunt
  grunt.initConfig loadGruntTasksFromPath "./src/grunt-tasks"
  loadNpmTasks grunt, package_json.devDependencies
  grunt.task.run "notify_hooks"


  grunt.registerTask "default", "dev"
  
  grunt.registerTask "dev", [
    "build"
    "connect"
    "notify:dev"
    "watch"
  ]

  grunt.registerTask "build", [
    "coffee"
    # "browserify:dist"
    "jshint"
    "tape"
    "uglify"
    "yuidoc"
  ]

  grunt.registerTask "test", [
    "build"
    "connect"
    "saucelabs-custom"
  ]