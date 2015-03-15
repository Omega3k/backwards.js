module.exports =
  backwards_dev: 
    files: ["src/backwards.coffee", "package.json"]
    tasks: [
      "updateVersionNumber"
      "notify:version_number"
      "updateBowerJSON"
      "coffee:backwards_dev"
      "jshint:backwards_dev"
      "tape"
      "yuidoc"
    ]

  tests: 
    files: ["src/specs/**/*.coffee"]
    tasks: [
      "coffee:test-suite"
      "coffee:tape_tests"
      "tape"
    ]

  test_suite_front_end: 
    files: ["test-suite/**/*.coffee"]
    tasks: ["coffee:test_suite_front_end"]

  gruntfile: 
    files: ["Gruntfile.coffee", "src/grunt-tasks/**/*.coffee"]
    tasks: ["notify:gruntfile"]

  npm_ignore: 
    files: [".npmignore"]
    tasks: [
      "updateBowerJSON"
    ]