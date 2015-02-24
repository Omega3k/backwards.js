addBrowser = (os, name, version) ->
  return {
    platform   : os
    browserName: name
    version    : version
  }

browsers_list = [
  addBrowser "Windows 8.1", "firefox"
  addBrowser "Windows 8.1", "chrome"
  addBrowser "Windows 8.1", "internet explorer", "11"
  addBrowser "Windows 8"  , "internet explorer", "10"
  addBrowser "Windows 7"  , "internet explorer", "9"
  addBrowser "Windows XP" , "internet explorer", "8"
  addBrowser "Windows XP" , "internet explorer", "7"
  addBrowser "Windows XP" , "internet explorer", "6"
  addBrowser "Windows XP" , "internet explorer", "8"
  addBrowser "OS X 10.9"  , "firefox"
  addBrowser "OS X 10.9"  , "chrome"
  addBrowser "OS X 10.9"  , "iphone"
  addBrowser "OS X 10.9"  , "ipad"
  addBrowser "Linux"      , "firefox"
  addBrowser "Linux"      , "chrome"
  addBrowser "Linux"      , "opera"
]

module.exports =
  all:
    options:
      urls         : ["http://0.0.0.0:9999/test-suite/"]
      tunnelTimeout: 5
      build        : process.env.TRAVIS_JOB_ID
      concurrency  : 6
      browsers     : browsers_list
      tags         : ["master"]