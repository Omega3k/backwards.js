grunt        = require "grunt"
readFile     = grunt.file.read
readJSONFile = grunt.file.readJSON

LICENSE      = readFile "LICENSE"
package_json = readJSONFile "package.json"

module.exports =
  options:
    banner: """
            /*
            #{ LICENSE }

            Source-Code: https://github.com/Omega3k/backwards.js
            */



            """
    mangle:
      except: ["jQuery", "Backbone"]

  backwards:
    files:
      "build/backwards.min.js": ["build/backwards.dev.js"]