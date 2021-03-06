test     = require "tape"
isFinite = require( "../../build/backwards.dev" ).isFinite
txt      = "backwards.isFinite should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isFinite, "function"
  t.end()

test "#{ txt } return true if given a finite Number", (t) ->
  t.equal isFinite( 1234 )           , true
  t.equal isFinite( +new Date() )    , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if typeof document isnt "undefined"
    domElement = document.createElement "div"
    t.equal isFinite( domElement )   , false

  if typeof Promise isnt "undefined"
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isFinite( promise )      , false

  t.equal isFinite( arguments )      , false
  t.equal isFinite( [] )             , false
  t.equal isFinite( new Array() )    , false
  t.equal isFinite( true )           , false
  t.equal isFinite( new Date() )     , false

  t.equal isFinite( new Error() )    , false
  t.equal isFinite( new TypeError() ), false
  t.equal isFinite( (x) -> x )       , false
  t.equal isFinite( new Function() ) , false

  t.equal isFinite( Infinity )       , false
  t.equal isFinite( NaN )            , false
  t.equal isFinite( new Number() )   , false
  t.equal isFinite( {} )             , false
  t.equal isFinite( new Object() )   , false
  t.equal isFinite( /./ )            , false
  t.equal isFinite( new RegExp() )   , false
  t.equal isFinite( "string" )       , false
  t.equal isFinite( new String() )   , false
  t.equal isFinite( null )           , false
  t.equal isFinite( undefined )      , false
  t.end()