test    = require "tape"
_delete = require( "../../build/backwards.dev" ).delete
txt     = "backwards.delete should"

test "#{ txt } be a function", (t) ->
  t.equal typeof _delete, "function"
  t.end()

test "#{ txt } work as expected", (t) ->
  array = [12,54,18,NaN,"element"]

  t.equal _delete( "none", [] ).toString(), [].toString()
  t.equal _delete( 12, array ).toString(), [54,18,NaN,"element"].toString()
  t.equal _delete( NaN, array ).toString(), [12,54,18,"element"].toString()
  t.equal _delete( "element", array ).toString(), [12,54,18,NaN].toString()
  t.equal _delete( 1234, array ).toString()
  , [12,54,18,NaN,"element"].toString()

  t.equal _delete( "none", "" )         , ""
  t.equal _delete( "e", "element" )     , "lement"
  t.equal _delete( "ele", "element" )   , "ment"
  t.equal _delete( "men", "element" )   , "elet"
  t.equal _delete( "ele", "eelement" )  , "ement"
  t.equal _delete( "elee", "eelement" ) , "eelement"
  t.end()