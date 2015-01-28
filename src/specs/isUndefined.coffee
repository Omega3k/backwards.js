test        = require "tape"
isUndefined = require( "../../build/backwards.dev" ).isUndefined
txt         = "backwards.isUndefined should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isUndefined, "function"
  t.end()

test "#{ txt } return true if given an Undefined", (t) ->
  t.equal isUndefined( undefined )      , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof document isnt "undefined"
    domElement = document.createElement "div"
    t.equal isUndefined( domElement )   , false

  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isUndefined( promise )      , false

  t.equal isUndefined( arguments )      , false
  t.equal isUndefined( [] )             , false
  t.equal isUndefined( new Array() )    , false
  t.equal isUndefined( true )           , false
  t.equal isUndefined( new Date() )     , false
  t.equal isUndefined( +new Date() )    , false
  t.equal isUndefined( new Error() )    , false
  t.equal isUndefined( new TypeError() ), false
  t.equal isUndefined( (x) -> x )       , false
  t.equal isUndefined( new Function() ) , false
  t.equal isUndefined( 1234 )           , false
  t.equal isUndefined( Infinity )       , false
  t.equal isUndefined( NaN )            , false
  t.equal isUndefined( new Number() )   , false
  t.equal isUndefined( {} )             , false
  t.equal isUndefined( new Object() )   , false
  t.equal isUndefined( /./ )            , false
  t.equal isUndefined( new RegExp() )   , false
  t.equal isUndefined( "string" )       , false
  t.equal isUndefined( new String() )   , false
  t.equal isUndefined( null )           , false
  
  t.end()