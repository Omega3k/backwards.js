module.exports =
  options:
    "-W030" : true
    eqeqeq  : true
    eqnull  : true
    laxcomma: true
    undef   : true
    node    : true
    globals:
      jQuery  : true
      "window": true
      document: true
      alert   : true
      module  : true
      exports : true
      define  : true
      require : true

  backwards_dev: ["build/backwards.dev.js"]