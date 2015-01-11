test  = require "tape"
isNaN = require( "../../build/backwards.dev" ).isNaN
txt   = "backwards.isNaN should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isNaN, "function"
  t.end()

test "#{ txt } return true if given an Array", (t) ->
  t.equal isNaN( NaN )            , true
  t.equal isNaN( new Number() )   , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  t.equal isNaN( arguments )      , false
  t.equal isNaN( [] )             , false
  t.equal isNaN( new Array() )    , false
  t.equal isNaN( true )           , false
  t.equal isNaN( new Date() )     , false
  t.equal isNaN( new Error() )    , false
  t.equal isNaN( new TypeError() ), false
  t.equal isNaN( (x) -> x )       , false
  t.equal isNaN( new Function() ) , false
  t.equal isNaN( 1234 )           , false
  t.equal isNaN( Infinity )       , false
  
  t.equal isNaN( {} )             , false
  t.equal isNaN( new Object() )   , false
  t.equal isNaN( /./ )            , false
  t.equal isNaN( new RegExp() )   , false
  t.equal isNaN( "string" )       , false
  t.equal isNaN( new String() )   , false
  t.equal isNaN( null )           , false
  t.equal isNaN( undefined )      , false
  t.end()