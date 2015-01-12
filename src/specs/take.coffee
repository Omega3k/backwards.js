test = require "tape"
take = require( "../../build/backwards.dev" ).take
txt  = "backwards.take should"

stringify = (obj) ->
  acc = "{ "
  for key, value of obj
    acc += "#{ key }: #{ value }, "
  return "#{ acc } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof take, "function"
  t.end()

test "#{ txt } work on Arrays", (t) ->
  t.equal take(  3, [1, 2, 3, 4, 5] ).toString(), [1, 2, 3].toString()
  t.equal take( -2, [1, 2, 3, 4, 5] ).toString(), [4, 5].toString()
  t.end()

test "#{ txt } work on Strings", (t) ->
  t.equal take(  5, "Hello World!" ), "Hello"
  t.equal take( -6, "Hello World!" ), "World!"
  t.end()

test "#{ txt } work on Objects", (t) ->
  obj =
    id    : 1
    age   : 29
    gender: "male"
    name  : "John Doe"

  actual    = stringify obj
  expected  = "{ name: #{ obj.name },  }"
  takenObj1 = stringify( take( ['name'], obj ) )
  takenObj2 = stringify( take( ['name', 'occupation'], obj ) )

  t.equal takenObj1       , expected
  t.equal takenObj2       , expected
  t.equal stringify( obj ), actual
  t.end()