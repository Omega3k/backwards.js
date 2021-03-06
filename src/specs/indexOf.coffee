test    = require "tape"
indexOf = require( "../../build/backwards.dev" ).indexOf
txt     = "backwards.indexOf should"

test "#{ txt } be a function", (t) ->
  t.equal typeof indexOf, "function"
  t.end()

test "#{ txt } function correctly on arrays", (t) ->
  array = [2, 5, 9]

  t.equal indexOf( 2,  0, array ),  0
  t.equal indexOf( 7,  0, array ), -1
  t.equal indexOf( 9,  2, array ),  2
  t.equal indexOf( 2, -1, array ), -1
  t.equal indexOf( 2, -3, array ),  0
  t.equal indexOf( 2, -8, array ),  0
  t.end()

test "#{ txt } function correctly on strings", (t) ->
  string = "Blue Whale"

  t.equal indexOf( "Blue", undefined, string ),    0
  t.equal indexOf( "Blute", undefined, string ),  -1
  t.equal indexOf( "blue", undefined, string ),   -1
  t.equal indexOf( "Whale", 0, string ),           5
  t.equal indexOf( "Whale", 5, string ),           5
  t.equal indexOf( "", 9, string ),                9
  t.equal indexOf( "", 10, string ),              10
  t.equal indexOf( "", 11, string ),              10
  t.end()

test "#{ txt } return the correct result in this use-case", (t) ->
  array  = ["a", "b", "a", "c", "a", "d"]
  result = []
  tmp    = indexOf "a", 0, array

  while tmp isnt -1
    result.push tmp
    tmp = indexOf "a", ++tmp, array

  t.equal result.toString(), [0, 2, 4].toString()
  t.end()