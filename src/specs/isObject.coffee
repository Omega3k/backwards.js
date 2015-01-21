test     = require "tape"
isObject = require( "../../build/backwards.dev" ).isObject
txt      = "backwards.isObject should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isObject, "function"
  t.end()

test "#{ txt } return true if given an Object", (t) ->
  t.equal isObject( {} )             , true
  t.equal isObject( new Object() )   , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isObject( promise )      , false

  t.equal isObject( arguments )      , false
  t.equal isObject( [] )             , false
  t.equal isObject( new Array() )    , false
  t.equal isObject( true )           , false
  t.equal isObject( new Date() )     , false
  t.equal isObject( +new Date() )    , false
  t.equal isObject( new Error() )    , false
  t.equal isObject( new TypeError() ), false
  t.equal isObject( (x) -> x )       , false
  t.equal isObject( new Function() ) , false
  t.equal isObject( 1234 )           , false
  t.equal isObject( Infinity )       , false
  t.equal isObject( NaN )            , false
  t.equal isObject( new Number() )   , false
  
  t.equal isObject( /./ )            , false
  t.equal isObject( new RegExp() )   , false
  t.equal isObject( "string" )       , false
  t.equal isObject( new String() )   , false
  t.equal isObject( null )           , false
  t.equal isObject( undefined )      , false
  t.end()