test      = require "tape"
isElement = require( "../../build/backwards.dev" ).isElement
txt       = "backwards.isElement should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isElement, "function"
  t.end()

test "#{ txt } return true if given a DOM element", (t) ->
  if typeof document isnt "undefined"
    domElement = document.createElement "div"
    t.equal isElement( domElement )   , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isElement( promise )      , false

  t.equal isElement( arguments )      , false
  t.equal isElement( [] )             , false
  t.equal isElement( new Array() )    , false
  t.equal isElement( true )           , false
  t.equal isElement( new Date() )     , false
  t.equal isElement( +new Date() )    , false
  t.equal isElement( new Error() )    , false
  t.equal isElement( new TypeError() ), false
  t.equal isElement( (x) -> x )       , false
  t.equal isElement( new Function() ) , false
  t.equal isElement( 1234 )           , false
  t.equal isElement( Infinity )       , false
  t.equal isElement( NaN )            , false
  t.equal isElement( new Number() )   , false
  t.equal isElement( {} )             , false
  t.equal isElement( new Object() )   , false
  t.equal isElement( /./ )            , false
  t.equal isElement( new RegExp() )   , false
  t.equal isElement( "string" )       , false
  t.equal isElement( new String() )   , false
  t.equal isElement( null )           , false
  t.equal isElement( undefined )      , false
  t.end()