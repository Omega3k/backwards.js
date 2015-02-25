module.exports =
  options:
    join: true
    bare: false

  backwards_dev:
    files:
      "build/backwards.dev.js": ["src/backwards.coffee"]

  test_suite_front_end:
    files:
      "test-suite/ux.js": [
        "src/specs/**/*.coffee"
        "test-suite/ux.coffee"
      ]

  tape_tests:
    files:
      "src/specs/_tape_tests.js": ["src/specs/**/*.coffee"]