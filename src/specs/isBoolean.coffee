test      = require "tape"
isBoolean = require( "../../build/backwards.dev" ).isBoolean
txt       = "backwards.isBoolean should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isBoolean, "function"
  t.end()

test "#{ txt } return true if given a Boolean", (t) ->
  t.equal isBoolean( true )           , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  t.equal isBoolean( arguments )      , false
  t.equal isBoolean( [] )             , false
  t.equal isBoolean( new Array() )    , false
  
  t.equal isBoolean( new Date() )     , false
  t.equal isBoolean( new Error() )    , false
  t.equal isBoolean( new TypeError() ), false
  t.equal isBoolean( (x) -> x )       , false
  t.equal isBoolean( new Function() ) , false
  t.equal isBoolean( 1234 )           , false
  t.equal isBoolean( Infinity )       , false
  t.equal isBoolean( NaN )            , false
  t.equal isBoolean( new Number() )   , false
  t.equal isBoolean( {} )             , false
  t.equal isBoolean( new Object() )   , false
  t.equal isBoolean( /./ )            , false
  t.equal isBoolean( new RegExp() )   , false
  t.equal isBoolean( "string" )       , false
  t.equal isBoolean( new String() )   , false
  t.equal isBoolean( null )           , false
  t.equal isBoolean( undefined )      , false
  t.end()