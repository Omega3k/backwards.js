test     = require "tape"
compose  = require( "../../build/backwards.dev" ).compose
txt      = "backwards.compose should"

addOne   = (x) -> x + 1
timesTwo = (x) -> x * 2

test "#{ txt } be a function", (t) ->
  t.equal typeof compose, "function"
  t.end()

test "#{ txt } compose functions correctly", (t) ->
  nine = compose( addOne, timesTwo )( 4 )
  ten  = compose( timesTwo, addOne )( 4 )
  t.equal nine, 9
  t.equal ten, 10
  t.end()