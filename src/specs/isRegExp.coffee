test     = require "tape"
isRegExp = require( "../../build/backwards.dev" ).isRegExp
txt      = "backwards.isRegExp should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isRegExp, "function"
  t.end()

test "#{ txt } return true if given a RegExp", (t) ->
  t.equal isRegExp( /./ )            , true
  t.equal isRegExp( new RegExp() )   , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  if Promise
    promise = new Promise (resolve, reject) -> resolve "I'm a Promise"
    t.equal isRegExp( promise )      , false

  t.equal isRegExp( arguments )      , false
  t.equal isRegExp( [] )             , false
  t.equal isRegExp( new Array() )    , false
  t.equal isRegExp( true )           , false
  t.equal isRegExp( new Date() )     , false
  t.equal isRegExp( +new Date() )    , false
  t.equal isRegExp( new Error() )    , false
  t.equal isRegExp( new TypeError() ), false
  t.equal isRegExp( (x) -> x )       , false
  t.equal isRegExp( new Function() ) , false
  t.equal isRegExp( 1234 )           , false
  t.equal isRegExp( Infinity )       , false
  t.equal isRegExp( NaN )            , false
  t.equal isRegExp( new Number() )   , false
  t.equal isRegExp( {} )             , false
  t.equal isRegExp( new Object() )   , false
  
  t.equal isRegExp( "string" )       , false
  t.equal isRegExp( new String() )   , false
  t.equal isRegExp( null )           , false
  t.equal isRegExp( undefined )      , false
  t.end()