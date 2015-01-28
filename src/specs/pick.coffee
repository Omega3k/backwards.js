test = require "tape"
pick = require( "../../build/backwards.dev" ).pick
txt  = "backwards.pick should"

stringify = (obj) ->
  acc = "{ "
  for key, value of obj
    acc += "#{ key }: #{ value }, "
  return "#{ acc } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof pick, "function"
  t.end()

test "#{ txt } work on Arrays", (t) ->
  t.equal pick(  3, [1, 2, 3, 4, 5] ).toString(), [1, 2, 3].toString()
  t.equal pick( -2, [1, 2, 3, 4, 5] ).toString(), [4, 5].toString()
  t.end()

test "#{ txt } work on Strings", (t) ->
  t.equal pick(  5, "Hello World!" ), "Hello"
  t.equal pick( -6, "Hello World!" ), "World!"
  t.end()

test "#{ txt } work on Objects", (t) ->
  obj =
    id    : 1
    age   : 29
    gender: "male"
    name  : "John Doe"

  actual    = stringify obj
  expected  = "{ name: #{ obj.name },  }"
  picknObj1 = stringify( pick( ['name'], obj ) )
  picknObj2 = stringify( pick( ['name', 'occupation'], obj ) )

  t.equal picknObj1       , expected
  t.equal picknObj2       , expected
  t.equal stringify( obj ), actual
  t.end()