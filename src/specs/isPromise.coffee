test      = require "tape"
isPromise = require( "../../build/backwards.dev" ).isPromise
txt       = "backwards.isPromise should"

test "#{ txt } be a function", (t) ->
  t.equal typeof isPromise, "function"
  t.end()

test "#{ txt } return true if given a Promise", (t) ->
  if Promise
    promise = new Promise (resolve, reject) -> resolve false
    t.equal isPromise( promise )      , true
  t.end()

test "#{ txt } return false if given anything else", (t) ->
  t.equal isPromise( arguments )      , false
  t.equal isPromise( [] )             , false
  t.equal isPromise( new Array() )    , false
  t.equal isPromise( true )           , false
  t.equal isPromise( new Date() )     , false
  t.equal isPromise( +new Date() )    , false
  t.equal isPromise( new Error() )    , false
  t.equal isPromise( new TypeError() ), false
  t.equal isPromise( (x) -> x )       , false
  t.equal isPromise( new Function() ) , false
  t.equal isPromise( 1234 )           , false
  t.equal isPromise( Infinity )       , false
  t.equal isPromise( NaN )            , false
  t.equal isPromise( new Number() )   , false
  t.equal isPromise( {} )             , false
  t.equal isPromise( new Object() )   , false
  t.equal isPromise( /./ )            , false
  t.equal isPromise( new RegExp() )   , false
  t.equal isPromise( "string" )       , false
  t.equal isPromise( new String() )   , false
  t.equal isPromise( null )           , false
  t.equal isPromise( undefined )      , false
  t.end()