test = require "tape"
take = require( "../../build/backwards.dev" ).take
txt  = "backwards.take should"

test "#{ txt } be a function", (t) ->
  t.equal typeof take, "function"
  t.end()

test "#{ txt } work on Arrays", (t) ->
  t.equal take( 3, [1, 2, 3, 4, 5] ).toString(), [1, 2, 3].toString()
  t.end()

test "#{ txt } work on Strings", (t) ->
  t.equal take( 5, "Hello World!" ), "Hello"
  t.end()