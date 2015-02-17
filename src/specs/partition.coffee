test      = require "tape"
backwards = require( "../../build/backwards.dev" )
partition = backwards.partition
contains  = backwards.contains
txt       = "backwards.partition should"

test "#{ txt } be a function", (t) ->
  t.equal typeof partition, "function"
  t.end()

test "#{ txt } work as expected", (t) ->
  array        = [12,54,18,NaN,"element"]
  predicateOne = (x) -> x > 15
  predicateTwo = (x) -> contains x, 0, "element"

  t.equal partition( predicateOne, array )[0].toString(), [54, 18].toString()
  t.equal partition( predicateOne, array )[1].toString()
  , [12, NaN, "element"].toString()

  t.equal partition( predicateTwo, "elementary eh!" )[0].toString()
  , ["e","l","e","m","e","n","t","e"].toString()
  t.equal partition( predicateTwo, "elementary eh!" )[1].toString()
  , ["a","r","y"," ","h","!"].toString()

  t.end()