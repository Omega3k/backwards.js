test      = require "tape"
filter    = require( "../../build/backwards.dev" ).filter
txt       = "backwards.filter should"

predicate = (x) -> x > 10

stringify = (obj) ->
  acc = "{ "
  for key, value of obj
    acc += "#{ key }: #{ value }, "
  return "#{ acc } }"


test "#{ txt } be a function", (t) ->
  t.equal typeof filter, "function"
  t.end()

test "#{ txt } filter Arrays correctly", (t) ->
  array         = [12, 5, 8, 130, 44]
  actual        = array.toString()
  expected      = [12, 130, 44].toString()
  filteredArray = filter( predicate, array ).toString()
  emptyArray    = [].toString()

  t.equal filteredArray                               , expected
  t.equal array.toString()                            , actual
  t.equal filter( predicate, [] ).toString()          , emptyArray
  t.equal filter( predicate, new Array() ).toString() , emptyArray
  t.end()

test "#{ txt } filter Objects correctly", (t) ->
  obj         = 
    id     : 1
    friends: 500

  actual      = "{ id: 1, friends: 500,  }"
  expected    = "{ friends: 500,  }"
  emptyObj    = "{  }"

  t.equal stringify( filter( predicate, obj ) )       , expected
  t.equal stringify( obj )                            , actual
  t.equal stringify( {} )                             , emptyObj
  t.equal stringify( new Object() )                   , emptyObj
  t.end()

test "#{ txt } filter Numbers correctly", (t) ->
  timestamp = +new Date()
  t.equal filter( predicate, 9 )                      , undefined
  t.equal filter( predicate, 1234 )                   , 1234
  t.equal filter( predicate, Infinity )               , Infinity
  t.equal filter( predicate, NaN )                    , undefined
  t.equal filter( predicate, new Number() )           , undefined
  t.equal filter( predicate, timestamp )              , timestamp
  t.end()

test "#{ txt } filter other values correctly as well", (t) ->
  date = new Date()

  t.equal filter( predicate, true )                   , undefined
  t.equal filter( predicate, date )                   , date
  t.equal filter( predicate, new Error() )            , undefined
  t.equal filter( predicate, new TypeError() )        , undefined
  t.equal filter( predicate, predicate )              , undefined
  t.equal filter( predicate, new Function() )         , undefined
  t.equal filter( predicate, /./ )                    , undefined
  t.equal filter( predicate, new RegExp() )           , undefined
  t.equal filter( predicate, "string" )               , undefined
  t.equal filter( predicate, new String() )           , undefined
  t.equal filter( predicate, null )                   , undefined
  t.equal filter( predicate, undefined )              , undefined
  t.end()