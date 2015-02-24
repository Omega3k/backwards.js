module.exports =
  backwards_dev: 
    files: ["src/backwards.coffee"]
    tasks: [
      "coffee:backwards_dev"
      "jshint:backwards_dev"
      "tape"
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
    tasks: [
      "coffee"
    ]

  docs: 
    files: ["build/backwards.dev.js"]
    tasks: [
      "jshint:backwards_dev"
      "yuidoc"
    ]