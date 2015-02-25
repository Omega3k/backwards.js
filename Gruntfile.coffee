# Instructions for setting up saucelabs with Jasmine Testing Framework 
# and Travis CI. 
# https://saucelabs.com/javascript/jasmine-js
# http://docs.travis-ci.com/user/encrypting-files/#Manual-Encryption
# https://saucelabs.com/platforms/webdriver
# https://docs.saucelabs.com/reference/rest-api/#jsunit

# https://github.com/gotwarlost/istanbul
# https://github.com/gruntjs/grunt-contrib-yuidoc
# http://yui.github.io/yuidoc/syntax

# http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
# http://www.jayway.com/2014/01/20/clean-grunt/
# http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/


"use strict"

_             = require "backwards"
compose       = _.compose
curry         = _.curry
extend        = _.extend
forEach       = _.forEach
contains      = _.contains
map           = _.map
reduce        = _.reduce

timegrunt     = require "time-grunt"
fs            = require "fs"
readDir       = fs.readdirSync
isFile        = (file) -> fs.statSync( file ).isFile()
readFile      = (filename) ->
  fs.readFileSync filename, encoding: "utf-8"

writeFile     = fs.writeFileSync
readJSONFile  = compose JSON.parse, readFile

writeJSONFile = curry (filename, data) ->
  fs.writeFileSync filename, JSON.stringify data


replace       = curry (regexp, string, xs) -> xs.replace regexp, string
split         = curry (regexp, string) -> string.split regexp
join          = curry (regexp, array) -> array.join regexp
lines         = split /\r\n|\r|\n/
unlines       = join "\n"

removeExt     = replace /.coffee$/, ""
containsGrunt = contains "grunt-", 0

loadGruntTasksFromPath = (path) ->
  reduce (acc, filename) ->
    acc[ filename ] = require "#{ path }/#{ filename }"
    acc
  , {}, map removeExt, readDir path


loadNpmTasks = (grunt, npm_tasks) ->
  forEach (value, key) ->
    if containsGrunt key
      grunt.loadNpmTasks key
      return
  , npm_tasks


module.exports = (grunt) ->
  grunt.initConfig extend loadGruntTasksFromPath( "./src/grunt-tasks" ),
    package  : readJSONFile "package.json"
    LICENSE  : readFile "LICENSE"
    backwards: readJSONFile "build/package.json"
  
  loadNpmTasks grunt, grunt.config.get( "package" ).devDependencies
  grunt.task.run "notify_hooks"
  timegrunt grunt


  grunt.registerTask "default", "dev"
  
  grunt.registerTask "dev", [
    "gitinfo"
    "build"
    "connect"
    "notify:dev"
    # "createGitConfigJSON"
    "watch"
  ]

  grunt.registerTask "build", [
    "updateVersionNumber"
    "notify:version_number"
    "coffee"
    # "browserify:dist"
    "jshint"
    "tape"
    "uglify"
    "yuidoc"
  ]

  grunt.registerTask "test", [
    "build"
    "updateTestCoverage"
    "coveralls"
    "connect"
    "saucelabs-custom"
  ]


  grunt.registerTask "updateTestCoverage", () ->
    grunt.util.spawn(
      cmd : "istanbul"
      args: ["cover", "src/specs/_tape_tests.js"]
      (error, result) ->
        return
      )
    return


  grunt.registerTask "updateVersionNumber", () ->
    file           = "src/backwards.coffee"
    version_number = grunt.config.get( "backwards" ).version
    
    replaceVersionNumber = replace(
      "backwards.VERSION = \"0.0.5\""
      "backwards.VERSION = \"#{ version_number }\""
      )

    writeFile file, compose(
      unlines
      map replaceVersionNumber
      lines
      ) readFile file
    return


  grunt.registerTask "createGitConfigJSON", () ->
    writeJSONFile "gitinfo.json", grunt.config.get "gitinfo"
    return