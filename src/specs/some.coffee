test      = require "tape"
some      = require( "../../build/backwards.dev" ).some
txt       = "backwards.some should"

predicate = (x) -> x > 10

test "#{ txt } be a function", (t) ->
  t.equal typeof some, "function"
  t.end()

test "#{ txt } return true if some of the values in the Array 
conforms with the predicate", (t) ->
  t.equal some( predicate, [12, 5, 8, 1, 4] ), true
  t.end()

test "#{ txt } return false if none of the values in the Array 
conforms with the predicate", (t) ->
  t.equal some( predicate, [2, 5, 8, 1, 4] ), false
  t.end()

test "#{ txt } return false if given an empty Array", (t) ->
  t.equal some( predicate, [] ), false
  t.end()