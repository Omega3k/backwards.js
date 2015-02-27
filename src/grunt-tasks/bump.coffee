# https://github.com/vojtajina/grunt-bump
# http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/

module.exports = 
  options:
    files             : ["build/package.json", "bower.json"]
    updateConfigs     : []
    commit            : false
    commitMessage     : "Release v%VERSION%"
    commitFiles       : ["-a"]
    createTag         : true
    tagName           : "v%VERSION%"
    tagMessage        : "Version v%VERSION%"
    push              : false
    pushTo            : "upstream"
    gitDescribeOptions: "--tags --always --abbrev=1 --dirty=d"
    globalReplace     : false
    prereleaseName    : false
    regExp            : false