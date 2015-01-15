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
  flattenedArray = flatten( [[0, 1], [2, 3], [4, 5]] ).toString()
  expected       = [0, 1, 2, 3, 4, 5].toString()

  t.equal flattenedArray, expected
  t.end()

test "#{ txt } reduce Arrays down to a single value even if 
given no initial value", (t) ->
  t.equal(
    reduce( add, undefined, [0, 1, 2, 3] )
    , 6
    )

  t.equal(
    reduce( append, undefined, [[1, 2], [3, 4]] ).toString()
    , [1, 2, 3, 4].toString()
    )
  t.end()

test "#{ txt } throw a TypeError if given no initial value and an empty array", (t) ->
  bool = false
  try
    reduce add, undefined, []
  catch error
    bool = true
  t.equal bool, true
  t.end()

test "#{ txt } reduce Objects down to a single value", (t) ->
  t.equal reduce( add, 0, {
      id  : 1
      grand_parents: 4
    } ), 5
  t.end()