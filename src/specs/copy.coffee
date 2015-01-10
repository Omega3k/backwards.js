test      = require "tape"
copy      = require( "../../build/backwards.dev" ).copy
txt       = "backwards.copy should"

stringify = (x) -> "{ id: #{ x.id }, name: #{ x.name } }"

test "#{ txt } be a function", (t) ->
  t.equal typeof copy, "function"
  t.end()

test "#{ txt } copy Arrays and not cause side-effects", (t) ->
  array       = [1, 2, 3]
  actual      = array.toString()
  expected    = "#{ actual }1"
  copiedArray = copy( array ).toString() + "1"

  t.equal copiedArray, expected
  t.equal array.toString(), actual
  t.end()

test "#{ txt } copy Objects and not cause side-effects", (t) ->
  obj       = { id: 1, name: "Some String" }
  actual    = stringify obj
  expected  = "#{ actual }1"
  copiedObj = stringify( copy( obj ) ) + "1"

  t.equal copiedObj, expected
  t.equal stringify( obj ), actual
  t.end()

test "#{ txt } copy Booleans and not cause side-effects", (t) ->
  bool = true

  t.equal copy( bool ) + 1, 2
  t.equal bool, true
  t.end()

test "#{ txt } copy Dates and not cause side-effects", (t) ->
  date       = new Date()
  actual     = date.toString()
  expected   = "#{ actual }1"
  copiedDate = copy( date ) + "1"

  t.equal copiedDate, expected
  t.equal date.toString(), actual
  t.end()

test "#{ txt } copy Errors and not cause side-effects", (t) ->
  error       = new Error "This is an error message"
  actual      = error.toString()
  expected    = "#{ actual }1"
  copiedError = copy( error ) + "1"

  t.equal copiedError, expected
  t.equal error.toString(), actual
  t.end()

test "#{ txt } copy Numbers and not cause side-effects", (t) ->
  num = 1

  t.equal copy( num ) + 1, 2
  t.equal num, 1
  t.end()

test "#{ txt } copy Strings and not cause side-effects", (t) ->
  string = "string"

  t.equal copy( string ) + "1", "string1"
  t.equal string, "string"
  t.end()