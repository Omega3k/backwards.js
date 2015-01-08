test     = require "tape"
either   = require( "../../build/backwards.dev" ).either
txt      = "backwards.either should"

test "#{ txt } be a function", (t) ->
  t.equal typeof either, "function"
  t.end()

test "#{ txt } return the first value if the second value does 
not exist", (t) ->
  t.equal either( 123, undefined ), 123
  t.equal either( 123, null ), 123
  t.end()

test "#{ txt } return the second value if it exist", (t) ->
  t.equal either( 123, 456 ), 456
  t.end()