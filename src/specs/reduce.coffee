test   = require "tape"
reduce = require( "../../build/backwards.dev" ).reduce
txt    = "backwards.reduce should"

add    = (a, b) -> a + b
append = (a, b) -> a.concat b

test "#{ txt } be a function", (t) ->
  t.equal typeof reduce, "function"
  t.end()

test "#{ txt } reduce Arrays down to a single value", (t) ->
  t.equal reduce( add, 0, [0, 1, 2, 3] ), 6
  t.end()

test "#{ txt } reduce Arrays in the 'proper' order", (t) ->
  flatten        = reduce append, []
  flattenedArray = flatten [[0, 1], [2, 3], [4, 5]]
  expected       = [0, 1, 2, 3, 4, 5]

  t.equal flattenedArray.toString(), expected.toString()
  t.end()