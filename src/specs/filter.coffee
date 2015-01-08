test      = require "tape"
filter    = require( "../../build/backwards.dev" ).filter
txt       = "backwards.filter should"

predicate = (x) -> x > 10

test "#{ txt } be a function", (t) ->
  t.equal typeof filter, "function"
  t.end()

test "#{ txt } filter Arrays correctly", (t) ->
  array         = [12, 5, 8, 130, 44]
  filteredArray = [12, 130, 44]
  t.equal filter( predicate, array ).toString(), filteredArray.toString()
  t.end()