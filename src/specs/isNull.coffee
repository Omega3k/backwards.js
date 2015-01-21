test   = require "tape"
isNull = require( "../../build/backwards.dev" ).isNull
txt    = "backwards.isNull should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isNull, "function"
  t.end()

test "#{ txt } return true if given a Null", (t) ->
  t.equal isNull( null )           , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isNull( promise )      , false

  t.equal isNull( arguments )      , false
  t.equal isNull( [] )             , false
  t.equal isNull( new Array() )    , false
  t.equal isNull( true )           , false
  t.equal isNull( new Date() )     , false
  t.equal isNull( +new Date() )    , false
  t.equal isNull( new Error() )    , false
  t.equal isNull( new TypeError() ), false
  t.equal isNull( (x) -> x )       , false
  t.equal isNull( new Function() ) , false
  t.equal isNull( 1234 )           , false
  t.equal isNull( Infinity )       , false
  t.equal isNull( NaN )            , false
  t.equal isNull( new Number() )   , false
  t.equal isNull( {} )             , false
  t.equal isNull( new Object() )   , false
  t.equal isNull( /./ )            , false
  t.equal isNull( new RegExp() )   , false
  t.equal isNull( "string" )       , false
  t.equal isNull( new String() )   , false
  
  t.equal isNull( undefined )      , false
  t.end()