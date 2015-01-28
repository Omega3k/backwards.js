test     = require "tape"
contains = require( "../../build/backwards.dev" ).contains
txt      = "backwards.contains should"

test "#{ txt } be a function", (t) ->
  t.equal typeof contains, "function"
  t.end()

test "#{ txt } function correctly on arrays", (t) ->
  array = [1, 2, 3, NaN]

  t.equal contains( 2,   0, array ), true
  t.equal contains( 4,   0, array ), false
  t.equal contains( 3,   3, array ), false
  t.equal contains( 3,  -2, array ), true
  t.equal contains( NaN, 0, array ), true
  t.equal contains( 2,  -8, array ), true
  t.end()

test "#{ txt } function correctly on strings", (t) ->
  string = "To be, or not to be, that is the question."

  t.equal contains( "To be",        undefined, string ), true
  t.equal contains( "question",     undefined, string ), true
  t.equal contains( "nonexistent",  undefined, string ), false
  t.equal contains( "To be",        1,         string ), false
  t.equal contains( "TO BE",        undefined, string ), false
  t.end()