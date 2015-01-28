test    = require "tape"
isError = require( "../../build/backwards.dev" ).isError
txt     = "backwards.isError should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isError, "function"
  t.end()

test "#{ txt } return true if given an Error", (t) ->
  t.equal isError( new Error() )    , true
  t.equal isError( new TypeError() ), true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof document isnt "undefined"
    domElement = document.createElement "div"
    t.equal isError( domElement )   , false

  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isError( promise )      , false

  t.equal isError( arguments )      , false
  t.equal isError( [] )             , false
  t.equal isError( new Array() )    , false
  t.equal isError( true )           , false
  t.equal isError( new Date() )     , false
  t.equal isError( +new Date() )    , false
  
  t.equal isError( (x) -> x )       , false
  t.equal isError( new Function() ) , false
  t.equal isError( 1234 )           , false
  t.equal isError( Infinity )       , false
  t.equal isError( NaN )            , false
  t.equal isError( new Number() )   , false
  t.equal isError( {} )             , false
  t.equal isError( new Object() )   , false
  t.equal isError( /./ )            , false
  t.equal isError( new RegExp() )   , false
  t.equal isError( "string" )       , false
  t.equal isError( new String() )   , false
  t.equal isError( null )           , false
  t.equal isError( undefined )      , false
  t.end()