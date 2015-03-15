module.exports =
  compile: 
    options: 
      paths      : "build"
      outdir     : "docs"
      linkNatives: true
    
    name       : "backwards.js@<%= gitinfo.local.branch.current.SHA %>"
    description: "<%= package.description %>"
    version    : "<%= package.version %>"
    url        : "<%= package.homepage %>"