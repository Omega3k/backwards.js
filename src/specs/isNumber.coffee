test     = require "tape"
isNumber = require( "../../build/backwards.dev" ).isNumber
txt      = "backwards.isNumber should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isNumber, "function"
  t.end()

test "#{ txt } return true if given a Number", (t) ->
  t.equal isNumber( 1234 )           , true
  t.equal isNumber( Infinity )       , true
  t.equal isNumber( NaN )            , true
  t.equal isNumber( new Number() )   , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  t.equal isNumber( arguments )      , false
  t.equal isNumber( [] )             , false
  t.equal isNumber( new Array() )    , false
  t.equal isNumber( true )           , false
  t.equal isNumber( new Date() )     , false
  t.equal isNumber( new Error() )    , false
  t.equal isNumber( new TypeError() ), false
  t.equal isNumber( (x) -> x )       , false
  t.equal isNumber( new Function() ) , false
  
  t.equal isNumber( {} )             , false
  t.equal isNumber( new Object() )   , false
  t.equal isNumber( /./ )            , false
  t.equal isNumber( new RegExp() )   , false
  t.equal isNumber( "string" )       , false
  t.equal isNumber( new String() )   , false
  t.equal isNumber( null )           , false
  t.equal isNumber( undefined )      , false
  t.end()