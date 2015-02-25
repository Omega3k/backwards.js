# https://github.com/damkraw/grunt-gitinfo

module.exports =
  local:
    branch:
      current:
        SHA              : "Current HEAD SHA"
        shortSHA         : "Current HEAD short SHA"
        name             : "Current branch name"
        currentUser      : "Current git user"
        lastCommitTime   : "Last commit time"
        lastCommitMessage: "Last commit message"
        lastCommitAuthor : "Last commit author"
        lastCommitNumber : "Last commit number"

    remote:
      origin:
        url: "Branch URL"

# info      = grunt.config.get "gitinfo"
# short_sha = info.local.branch.current.shortSHA
# #>> b7dcd4a
# gihub_url = info.remote.origin.url
# #>> https://github.com/Omega3k/backwards.js.git