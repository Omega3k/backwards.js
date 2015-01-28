test = require "tape"
omit = require( "../../build/backwards.dev" ).omit
txt  = "backwards.omit should"

stringify = (obj) ->
  acc = "{ "
  for key, value of obj
    acc += "#{ key }: #{ value }, "
  return "#{ acc } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof omit, "function"
  t.end()

test "#{ txt } work on Arrays", (t) ->
  t.equal omit(  3, [1, 2, 3, 4, 5] ).toString(), [4, 5].toString()
  t.equal omit( -2, [1, 2, 3, 4, 5] ).toString(), [1, 2, 3].toString()
  t.end()

test "#{ txt } work on Strings", (t) ->
  t.equal omit(  6, "Hello World!" ), "World!"
  t.equal omit( -7, "Hello World!" ), "Hello"
  t.end()

test "#{ txt } work on Objects", (t) ->
  obj =
    id    : 1
    age   : 29
    gender: "male"
    name  : "John Doe"

  actual      = stringify obj
  expected    = "{ name: #{ obj.name },  }"
  omitpedObj1 = omit( ['id', 'age', 'gender'], obj )
  omitpedObj2 = omit( ['occupation'], omitpedObj1 )

  t.equal stringify( omitpedObj1 ), expected
  t.equal stringify( omitpedObj2 ), expected
  t.equal stringify( obj )        , actual
  t.end()