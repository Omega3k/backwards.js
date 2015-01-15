test   = require "tape"
extend = require( "../../build/backwards.dev" ).extend
txt    = "backwards.extend should"

stringify = (object) ->
  acc = "{ "
  for own key, value of object
    acc += "#{ key }: #{ value }, "
  "#{ acc[0...acc.length-2] } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof extend, "function"
  t.end()

test "#{ txt } extend Objects and return the first object 
with side-effects", (t) ->
  obj =
    id    : 1
    age   : 29
    gender: "male"
    name  : "John Doe"

  actual = stringify obj

  expected_parent = stringify 
    id    : 1
    age   : 30
    gender: "male"
    name  : "John Doe Sr."

  expected_child = stringify 
    id    : 2
    age   : 0
    gender: "male"
    name  : "John Doe Jr."

  parent = extend( obj, { age: 30, name: "John Doe Sr." } )
  child  = extend( {}, obj, { id: 2, age: 0, name: "John Doe Jr." } )

  t.equal expected_parent, stringify parent
  t.equal expected_parent, stringify obj
  t.equal expected_child , stringify child
  t.end()









