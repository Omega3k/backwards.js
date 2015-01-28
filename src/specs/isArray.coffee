test    = require "tape"
isArray = require( "../../build/backwards.dev" ).isArray
txt     = "backwards.isArray should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isArray, "function"
  t.end()

test "#{ txt } return true if given an Array", (t) ->
  t.equal isArray( [] )             , true
  t.equal isArray( new Array() )    , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof document isnt "undefined"
    domElement = document.createElement "div"
    t.equal isArray( domElement )   , false

  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isArray( promise )      , false

  t.equal isArray( arguments )      , false
  
  t.equal isArray( true )           , false
  t.equal isArray( new Date() )     , false
  t.equal isArray( +new Date() )    , false
  t.equal isArray( new Error() )    , false
  t.equal isArray( new TypeError() ), false
  t.equal isArray( (x) -> x )       , false
  t.equal isArray( new Function() ) , false
  t.equal isArray( 1234 )           , false
  t.equal isArray( Infinity )       , false
  t.equal isArray( NaN )            , false
  t.equal isArray( new Number() )   , false
  t.equal isArray( {} )             , false
  t.equal isArray( new Object() )   , false
  t.equal isArray( /./ )            , false
  t.equal isArray( new RegExp() )   , false
  t.equal isArray( "string" )       , false
  t.equal isArray( new String() )   , false
  t.equal isArray( null )           , false
  t.equal isArray( undefined )      , false
  t.end()