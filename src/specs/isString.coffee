test     = require "tape"
isString = require( "../../build/backwards.dev" ).isString
txt      = "backwards.isString should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isString, "function"
  t.end()

test "#{ txt } return true if given a String", (t) ->
  t.equal isString( "string" )       , true
  t.equal isString( new String() )   , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof document isnt "undefined"
    domElement = document.createElement "div"
    t.equal isString( domElement )   , false

  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isString( promise )      , false

  t.equal isString( arguments )      , false
  t.equal isString( [] )             , false
  t.equal isString( new Array() )    , false
  t.equal isString( true )           , false
  t.equal isString( new Date() )     , false
  t.equal isString( +new Date() )    , false
  t.equal isString( new Error() )    , false
  t.equal isString( new TypeError() ), false
  t.equal isString( (x) -> x )       , false
  t.equal isString( new Function() ) , false
  t.equal isString( 1234 )           , false
  t.equal isString( Infinity )       , false
  t.equal isString( NaN )            , false
  t.equal isString( new Number() )   , false
  t.equal isString( {} )             , false
  t.equal isString( new Object() )   , false
  t.equal isString( /./ )            , false
  t.equal isString( new RegExp() )   , false
  
  t.equal isString( null )           , false
  t.equal isString( undefined )      , false
  t.end()