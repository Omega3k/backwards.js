module.exports =
  server:
    options: 
      protocol        : "http"
      port            : 9999
      hostname        : "0.0.0.0"
      base            : "."
      directory       : null
      keepalive       : false
      debug           : false
      livereload      : false
      open            : false
      useAvailablePort: false
      onCreateServer  : null
      middleware      : null