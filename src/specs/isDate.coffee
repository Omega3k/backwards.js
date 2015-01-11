test   = require "tape"
isDate = require( "../../build/backwards.dev" ).isDate
txt    = "backwards.isDate should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isDate, "function"
  t.end()

test "#{ txt } return true if given a Date", (t) ->
  t.equal isDate( new Date() )     , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  t.equal isDate( arguments )      , false
  t.equal isDate( [] )             , false
  t.equal isDate( new Array() )    , false
  t.equal isDate( true )           , false
  t.equal isDate( +new Date() )    , false
  t.equal isDate( new Error() )    , false
  t.equal isDate( new TypeError() ), false
  t.equal isDate( (x) -> x )       , false
  t.equal isDate( new Function() ) , false
  t.equal isDate( 1234 )           , false
  t.equal isDate( Infinity )       , false
  t.equal isDate( NaN )            , false
  t.equal isDate( new Number() )   , false
  t.equal isDate( {} )             , false
  t.equal isDate( new Object() )   , false
  t.equal isDate( /./ )            , false
  t.equal isDate( new RegExp() )   , false
  t.equal isDate( "string" )       , false
  t.equal isDate( new String() )   , false
  t.equal isDate( null )           , false
  t.equal isDate( undefined )      , false
  t.end()