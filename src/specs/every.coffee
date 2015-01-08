test      = require "tape"
every     = require( "../../build/backwards.dev" ).every
txt       = "backwards.every should"

predicate = (x) -> x > 10

test "#{ txt } be a function", (t) ->
  t.equal typeof every, "function"
  t.end()

test "#{ txt } return true if every value conforms with 
the predicate", (t) ->
  t.equal every( predicate, [12, 54, 18, 130, 44] ), true
  t.end()

test "#{ txt } return true if given an empty Array", (t) ->
  t.equal every( predicate, [] ), true
  t.end()

test "#{ txt } return false if not every value conforms with 
the predicate", (t) ->
  t.equal every( predicate, [12, 5, 8, 130, 44] ), false
  t.end()