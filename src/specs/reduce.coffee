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
  max = reduce (max, num) ->
    if max > num then max else num
  , 0

  min = reduce (min, num) ->
    if min < num then min else num
  , 0

  t.equal max([1, 12, 99, 55]), 99
  t.equal min([1, 12, 99, 55]), 0

  t.equal(
    reduce( add, undefined, [0, 1, 2, 3] )
    , 6
    )

  t.equal(
    reduce( append, undefined, [[1, 2], [3, 4]] ).toString()
    , [1, 2, 3, 4].toString()
    )
  t.end()

test "#{ txt } reduce Objects down to a single value", (t) ->
  t.equal reduce( add, 0, {
      id  : 1
      grand_parents: 4
    } ), 5

  t.equal reduce( (acc, value, key) ->
      acc += "#{ key }: #{ value }, "
      acc
    , "", { id: 1, grand_parents: 4 })
    , "id: 1, grand_parents: 4, "
  t.end()

test "#{ txt } return the value without calling the callback 
function if given no initial value and an array with only one 
value", (t) ->
  try
    value = reduce add, undefined, [1]
  catch error
  
  t.equal value, 1
  t.end()

test "#{ txt } return the value without calling the callback 
function if given no initial value and an object with only 
one property", (t) ->
  try
    value = reduce add, undefined, { name: "awesome!" }
  catch error
  t.equal value, "awesome!"
  t.end()

test "#{ txt } return the initial value without calling the callback 
function if given an initial value and an empty array", (t) ->
  try
    value = reduce add, 1, []
  catch error
  t.equal value, 1
  t.end()

test "#{ txt } return the initial value without calling the callback 
function if given an initial value and an empty object", (t) ->
  try
    value = reduce add, "awesome!", {}
  catch error
  t.equal value, "awesome!"
  t.end()

test "#{ txt } throw a TypeError if given no initial value and an 
empty array", (t) ->
  bool = false
  try
    reduce add, undefined, []
  catch error
    bool = true
  t.equal bool, true
  t.end()

test "#{ txt } throw a TypeError if given no initial value and an 
empty object", (t) ->
  bool = false
  try
    reduce add, undefined, {}
  catch error
    bool = true
  t.equal bool, true
  t.end()

test "#{ txt } throw a TypeError if given no initial value and an 
empty object", (t) ->
  bool = false
  try
    reduce add, undefined, undefined
  catch error
    bool = true
  t.equal bool, true
  t.end()