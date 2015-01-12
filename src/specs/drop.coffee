test = require "tape"
drop = require( "../../build/backwards.dev" ).drop
txt  = "backwards.drop should"

stringify = (obj) ->
  acc = "{ "
  for key, value of obj
    acc += "#{ key }: #{ value }, "
  return "#{ acc } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof drop, "function"
  t.end()

test "#{ txt } work on Arrays", (t) ->
  t.equal drop(  3, [1, 2, 3, 4, 5] ).toString(), [4, 5].toString()
  t.equal drop( -2, [1, 2, 3, 4, 5] ).toString(), [1, 2, 3].toString()
  t.end()

test "#{ txt } work on Strings", (t) ->
  t.equal drop(  6, "Hello World!" ), "World!"
  t.equal drop( -7, "Hello World!" ), "Hello"
  t.end()

test "#{ txt } work on Objects", (t) ->
  obj =
    id    : 1
    age   : 29
    gender: "male"
    name  : "John Doe"

  actual      = stringify obj
  expected    = "{ name: #{ obj.name },  }"
  droppedObj1 = drop( ['id', 'age', 'gender'], obj )
  droppedObj2 = drop( ['occupation'], droppedObj1 )

  t.equal stringify( droppedObj1 ), expected
  t.equal stringify( droppedObj2 ), expected
  t.equal stringify( obj )        , actual
  t.end()