# https://github.com/vojtajina/grunt-bump
# http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/

module.exports = 
  options:
    files             : ["package.json", "bower.json"]
    updateConfigs     : []
    commit            : true
    commitMessage     : "Release v%VERSION%"
    commitFiles       : ["-a"]
    createTag         : true
    tagName           : "v%VERSION%"
    tagMessage        : "Version v%VERSION%"
    push              : true
    pushTo            : "origin"
    gitDescribeOptions: "--tags --always --abbrev=1 --dirty=d"
    globalReplace     : false
    prereleaseName    : false
    regExp            : false