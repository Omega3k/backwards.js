test = require "tape"
drop = require( "../../build/backwards.dev" ).drop
txt  = "backwards.drop should"

test "#{ txt } be a function", (t) ->
  t.equal typeof drop, "function"
  t.end()

test "#{ txt } work on Arrays", (t) ->
  t.equal drop( 3, [1, 2, 3, 4, 5] ).toString(), [4, 5].toString()
  t.end()

test "#{ txt } work on Strings", (t) ->
  t.equal drop( 6, "Hello World!" ), "World!"
  t.end()