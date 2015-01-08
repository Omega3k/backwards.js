test     = require "tape"
maybe    = require( "../../build/backwards.dev" ).maybe
txt      = "backwards.maybe should"

timesTwo = (x) -> x * 2

test "#{ txt } be a function", (t) ->
  t.equal typeof maybe, "function"
  t.end()

test "#{ txt } execute the given function if given something 
that is not null or undefined", (t) ->
  t.equal maybe( timesTwo, 123 ), 246
  t.end()

test "#{ txt } not execute the given function if given something 
that is null or undefined", (t) ->
  t.equal maybe( timesTwo, undefined ), undefined
  t.equal maybe( timesTwo, null )     , undefined
  t.end()