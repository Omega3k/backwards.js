# https://www.npmjs.com/package/grunt-notify

module.exports =
  watch:
    options:
      title  : "Task Complete"
      message: "Watch task completed successfully"

  dev:
    options:
      title  : "Dev task completed successfully"
      message: "Server running on http://localhost:9999"

  gruntfile:
    options:
      title  : "Grunt task changed"
      message: "Remember to restart \"grunt\" for the changes to take effect. "

  version_number:
    options:
      title  : "Version number is updated"
      message: "Updated backwards.VERSION and bower.json"