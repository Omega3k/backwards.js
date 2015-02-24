# https://www.npmjs.com/package/grunt-tape

module.exports =
  options:
    pretty: true
    output: "console"
    # output: "file"
    # file  : "./_tmp/test_results.tap"

  files: ["src/specs/_tape_tests.js"]