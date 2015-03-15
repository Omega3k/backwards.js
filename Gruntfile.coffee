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
unique        = require( "underscore" ).unique

fs            = require "fs"
readDir       = fs.readdirSync
isFile        = (file) -> fs.statSync( file ).isFile()
readFile      = (file) ->
  fs.readFileSync file, encoding: "utf-8"

writeFile     = fs.writeFileSync
readJSONFile  = compose JSON.parse, readFile

writeJSONFile = curry (file, data) ->
  fs.writeFileSync file, JSON.stringify data


replace       = curry (regexp, str, string) -> string.replace regexp, str
split         = curry (regexp, string) -> string.split regexp
join          = curry (regexp, array) -> array.join regexp
concat        = curry (a, b) -> a.concat b
lines         = split /\r\n|\r|\n/
unlines       = join "\n"
words         = split " "
unwords       = join " "

removeExt     = replace /.coffee$/, ""
containsGrunt = contains "grunt-", 0

loadGruntTasksFromPath = (path) ->
  reduce (acc, filename) ->
    acc[ filename ] = require "#{ path }/#{ filename }"
    acc
  , {}, map removeExt, readDir path




module.exports = (grunt) ->

  bashExec = (command_string, callback) ->
    callback = callback or () ->
    tmp      = split " ", command_string
    cmd      = tmp[0]
    args     = _.omit 1, tmp

    grunt.util.spawn
      cmd : cmd
      args: args
      callback
    return


  grunt.initConfig extend loadGruntTasksFromPath( "./src/grunt-tasks" ),
    package  : readJSONFile "package.json"
    bower    : readJSONFile "bower.json"
    LICENSE  : readFile "LICENSE"
    # backwards: readJSONFile "package.json"

  forEach (value, key) ->
    if containsGrunt key
      grunt.loadNpmTasks key
      return
  , grunt.config.get( "package" ).devDependencies


  grunt.task.run "notify_hooks"
  require( "time-grunt" )( grunt )


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
    # "updateREADMEFile"
    # "notify:version_number"
    "coffee"
    # "browserify:dist"
    "jshint"
    # "tape"
    "updateVersionNumber"
    "uglify"
    "yuidoc"
  ]

  grunt.registerTask "test", [
    "build"
    "updateTestCoverage"
    "connect"
    "saucelabs-custom"
  ]

  grunt.registerTask "coverage", [
    "updateTestCoverage"
    "coveralls"
  ]

  grunt.registerTask "update", [
    "updateBowerJSON"
  ]

  grunt.registerTask "publish", [
    "build"
    "coverage"
    "bump"
    "publishToNPM"
    "publishToBower"
    "notify:publish"
  ]

  grunt.registerTask "ignore", [
    "updateIgnoreFiles"
  ]

  grunt.registerTask "updateIgnoreFiles", () ->
    keep_files = [
      "build"
      "README.md"
      "package.json"
      "bower.json"
      "LICENSE"
    ]

    directory_files = readDir __dirname
    npm_ignore_file = readFile ".npmignore"

    # Aggregate files in keep_files and lines in ".npmignore" that are negated. 
    keep_files = concat keep_files, compose(
      _.map _.omit 1
      _.filter (str) -> /^!/.test str
      lines
      )( npm_ignore_file )

    directory_files = compose(
      _.filter (str) -> not _.contains str, 0, keep_files
      )( readDir __dirname )

    # Aggregate files 
    ignore_files = compose(
      unique
      concat directory_files
      # Filter out strings that should be kept
      _.filter (str) -> not _.contains str, 0, keep_files
      # Filter out strings that points to files that does not exist
      _.filter (str) -> _.contains str, 0, directory_files
      # Filter out empty strings
      _.filter (str) -> str isnt ""
      # Filter out comments
      _.filter (str) -> not /^#/.test str
      lines
      )( npm_ignore_file )

    bower        = grunt.config.get "bower"
    bower.ignore = unique concat bower.ignore, ignore_files
    grunt.config.set "bower", bower

    writeFile ".npmignore", unlines ignore_files
    writeFile "bower.json", JSON.stringify bower
    return


  grunt.registerTask "publishToNPM", () ->
    bashExec "sudo npm publish"
    return

  grunt.registerTask "publishToBower", () ->
    repo = grunt.config.get( "package" ).repository.url
    bashExec "sudo bower register backwards #{ repo }"
    return


  grunt.registerTask "updateTestCoverage", () ->
    bashExec "istanbul cover src/specs/_tape_tests.js"
    return


  # grunt.registerTask "updateREADMEFile", () ->
  #   writeFile "build/README.md", readFile "README.md"
  #   return


  grunt.registerTask "updateBowerJSON", () ->
    bower_filename   = "bower.json"
    package_filename = "package.json"
    bower_json       = readJSONFile bower_filename
    package_json     = readJSONFile package_filename
    keys = [
      "name"
      "version"
      "description"
      "main"
      "keywords"
      "license"
      "homepage"
    ]

    bower_json = _.extend(
      bower_json
      _.pick(keys, package_json)
      {
        authors: [package_json.author]
      }
      )
    
    # bower_json.authors = [package_json.author]
    writeJSONFile bower_filename, bower_json
    return


  grunt.registerTask "updateVersionNumber", () ->
    devFile        = "build/backwards.dev.js"
    minFile        = "build/backwards.min.js"
    version_number = grunt.config.get( "package" ).version
    
    replaceVersionNumber = replace(
      "backwards.VERSION = \"undefined\""
      "backwards.VERSION = \"#{ version_number }\""
      )

    writeFile devFile, replaceVersionNumber readFile devFile
    writeFile minFile, replaceVersionNumber readFile minFile
    return


  grunt.registerTask "createGitConfigJSON", () ->
    writeJSONFile "gitinfo.json", grunt.config.get "gitinfo"
    return

# http://shields.io/
# https://img.shields.io/badge/Awesome-Yes-green.svg