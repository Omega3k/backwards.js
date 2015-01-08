test      = require "tape"
map       = require( "../../build/backwards.dev" ).map
txt       = "backwards.map should"

addOne    = (x) -> x + 1
timesTwo  = (x) -> x * 2
stringify = (x) -> "{ id: #{ x.id }, name: #{ x.name } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof map, "function"
  t.end()

test "#{ txt } map over Arrays and not cause side-effects", (t) ->
  array       = [1, 2, 3]
  actual      = array.toString()
  expected    = [2, 3, 4].toString()
  mappedArray = map( addOne, array ).toString()

  t.equal mappedArray, expected
  t.equal array.toString(), actual
  t.end()

test "#{ txt } map over Objects and not cause side-effects", (t) ->
  obj       = { id: 1, name: "Some String" }
  actual    = stringify obj
  expected  = stringify { id: 2, name: "Some String1" }
  mappedObj = stringify map addOne, obj

  t.equal mappedObj, expected
  t.equal stringify( obj ), actual
  t.end()

test "#{ txt } map over Booleans and not cause side-effects", (t) ->
  bool       = true
  mappedBool = map addOne, bool

  t.equal map( addOne, bool ), 2
  t.equal bool, true
  t.end()

test "#{ txt } map over Numbers and not cause side-effects", (t) ->
  num = 1

  t.equal map( addOne, num ), 2
  t.equal num, 1
  t.end()

test "#{ txt } map over Strings and not cause side-effects", (t) ->
  string = "string"

  t.equal map( addOne, string ), "string1"
  t.equal string, "string"
  t.end()