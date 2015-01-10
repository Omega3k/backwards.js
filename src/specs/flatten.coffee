test    = require "tape"
flatten = require( "../../build/backwards.dev" ).flatten
txt     = "backwards.flatten should"

test "#{ txt } be a function", (t) ->
  t.equal typeof flatten, "function"
  t.end()

test "#{ txt } flatten Arrays one level without causing 
side-effects on the original Array", (t) ->
  array     = [[1, 2], [3, 4], [5, 6]]
  actual    = array.toString()
  expected  = [1, 2, 3, 4, 5, 6].toString()
  flattened = flatten( array ).toString()

  t.equal flattened, expected
  t.equal array.toString(), actual
  t.end()