module.exports =
  compile: 
    options: 
      paths      : "build"
      outdir     : "docs"
      linkNatives: true
    
    name       : "backwards.js@<%= gitinfo.local.branch.current.SHA %>"
    description: "<%= backwards.description %>"
    version    : "<%= backwards.version %>"
    url        : "<%= backwards.homepage %>"
    
    # name       : "backwards.js@<%= gitinfo.local.branch.current.shortSHA %>"
    # description: "A set of utility functions for functional programming in Javascript"
    # version    : "0.0.5"
    # url        : "https://github.com/Omega3k/backwards.js"
    # url        : "<%= gitinfo.remote.origin.url %>"