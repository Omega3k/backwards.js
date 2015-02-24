# https://www.npmjs.com/package/grunt-notify

module.exports =
  watch:
    options:
      title  : "Task Complete"
      message: "Watch task completed successfully"

  dev:
    options:
      title  : "Dev task completed successfully"
      message: "Web server is up and running on http://localhost:9999"

  server:
    options:
      title  : "http://localhost:9999"
      message: "Web server is ready!"