"use strict"


###*
A set of utility functions for functional programming in Javascript.

@module backwards
@main backwards
@class backwards
@static
###
backwards   = {}

array       = Array
arrayProto  = array.prototype
slice       = arrayProto.slice

object      = Object
objectProto = object.prototype
toString    = objectProto.toString

noop        = () ->
identity    = (x) -> x
add         = (a, b) -> a + b
append      = (a, b) -> if a.concat then a.concat b else a += b


###*
This function is an internal function that is used by 'autoCurry' to create curried functions from functions that take more than one parameter. 

@method curry
@param f {Function} The function to be curried. 
@param args* {"any"} Arguments that should be applied to the resulting function. 
@return {Function} A curried function. 
@private
###

curry = (f, args...) ->
  (params...) ->
    f.apply @, args.concat params


###*
Create a curried function from a function that normally takes multiple parameters. 

@method autoCurry
@param f {Function} The function to be curried. 
@param [length] {Number} An optional parameter defining how many parameters the given function has. 
@return {Function} A curried function. 
@public
@example
    function concat ( a, b ) {
      return a.concat( b );
    }

    var curriedConcat  = autoCurry( concat )      // A curried function
      , oneAndTwo      = curriedConcat( [1, 2] )  // A curried function
      , oneTwoAndThree = oneAndTwo( [3] )         // [1, 2, 3]
      , oneTwoAndFour  = oneAndTwo( [4] )         // [1, 2, 4]
    ;
###

autoCurry = (f, length = f.length) ->
  newFunction = (args...) ->
    if args.length < length
      autoCurry curry.apply(@, [f].concat(args)), length - args.length
    else f.apply @, args
  newFunction.toString = () -> f.toString()
  newFunction.curried = true
  return newFunction

backwards.autoCurry = autoCurry


###*
Compose your functions to a single function. 

@method compose
@param fs* {Function} Two or more functions that should be composed together. 
@return {Function} The result of composing all the argument functions. 
@public
@example
    function addOne ( x ) {
      return x + 1;
    }

    function timesTwo ( x ) {
      return x * 2;
    }

    var nine = compose( addOne, timesTwo )( 4 )   // 9
      , ten  = compose( timesTwo, addOne )( 4 )   // 10
    ;
###

compose = (fs...) ->
  (args...) ->
    i = fs.length
    while i-- then args = [fs[i].apply @, args]
    args[0]

backwards.compose = compose


###*
Check if an Object is of a particular type. 

@method isTypeOf
@param type {String} The String representation of the Object. 
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value representing whether x is a type. 
@public
@example
    var isBoolean = isTypeOf( 'Boolean' ) // A composed function
      , passed    = isBoolean( true )     // true
      , failed    = isBoolean( {} )       // false
    ;
###

isTypeOf = autoCurry (type, x) ->
  str = "[object #{ type }]"
  toString.call(x) is str

backwards.isTypeOf = isTypeOf


###*
Check if an Object is an Arguments object. 

@method isArguments
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isArguments( arguments )  // true
      , failed = isArguments( false )      // false
    ;
###

isArguments = do () ->
  if isTypeOf "Arguments", arguments then isTypeOf "Arguments"
  else (x) ->
    x? and x.hasOwnProperty "callee"

backwards.isArguments = isArguments


###*
Check if an Object is an Array. 

@method isArray
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isArray( [1, 2, 3] )  // true
      , failed = isArray( false )      // false
    ;
###

isArray           = Array.isArray or isTypeOf "Array"
backwards.isArray = isArray


###*
Check if an Object is a Boolean. 

@method isBoolean
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isBoolean( true )  // true
      , passes = isBoolean( false ) // true
      , failed = isBoolean( 0 )     // false
    ;
###

isBoolean = (x) ->
  x is true or x is false or isTypeOf "Boolean", x

backwards.isBoolean = isBoolean


# isDate :: a -> Boolean
isDate           = isTypeOf "Date"
backwards.isDate = isDate


# isError :: a -> Boolean
isError           = isTypeOf "Error" or isTypeOf "TypeError"
backwards.isError = isError


# isFinite :: a -> Boolean
# isFinite = (x) ->
#   isFinite(x) and not isNaN parseFloat x

isFinite = isFinite or (x) ->
  isNumber(x) and x isnt Infinity

backwards.isFinite = isFinite


###*
Check if an Object is a Function. 

@method isFunction
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var noop   = function () {}
      , passed = isFunction( noop )   // true
      , failed = isFunction( false )  // false
    ;
###

isFunction = do () ->
  if typeof /./ isnt "function"
    (x) -> typeof x is "function"
  else isTypeOf "Function"

backwards.isFunction = isFunction


###*
Check if an Object is a NaN object. 

@method isNaN
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isNaN( NaN )           // true
      , passes = isNaN( new Number() )  // true
      , failed = isNaN( false )         // false
    ;
###

isNaN = isNaN or (x) ->
  isNumber(x) and x isnt +x

backwards.isNaN = isNaN


###*
Check if an Object is a Null object. 

@method isNull
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isNull( null )    // true
      , failed = isNull( false )   // false
    ;
###

isNull = (x) ->
  x is null or isTypeOf "Null", x

backwards.isNull = isNull


###*
Check if an Object is a Number. 

@method isNumber
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isNumber( 123 )     // true
      , failed = isNumber( false )   // false
    ;
###

isNumber           = isTypeOf "Number"
backwards.isNumber = isNumber


###*
Check if an Object is an Object. 

@method isObject
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isObject( {} )      // true
      , failed = isObject( false )   // false
    ;
###

isObject = (x) ->
  if not x? or isArguments x then false
  else isTypeOf "Object", x

backwards.isObject = isObject


# isPromise :: a -> Boolean
isPromise           = isTypeOf "Promise"
backwards.isPromise = isPromise


# isRegExp :: a -> Boolean
isRegExp           = isTypeOf "RegExp"
backwards.isRegExp = isRegExp


###*
Check if an Object is a String. 

@method isString
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isString( "string" )  // true
      , failed = isString( false )     // false
    ;
###

isString           = isTypeOf "String"
backwards.isString = isString


###*
Check if an Object is undefined. 

@method isUndefined
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isUndefined( void 0 )   // true
      , failed = isUndefined( false )    // false
    ;
###

isUndefined = (x) ->
  x is undefined or isTypeOf "Undefined", x

backwards.isUndefined = isUndefined


# exists :: a -> Boolean
exists           = (x) -> x?
backwards.exists = exists


# isObjectEmpty :: Object -> Boolean
# isObjectEmpty = (x) ->
#   return false for own prop of x
#   true


# isArrayEmpty :: Array -> Boolean
# isArrayEmpty = (x) -> if x.length then false else true

# isEmpty :: Array|Object -> Boolean
isEmpty = (x) ->
  if isObject x 
    return false for own key of x
  else if isArray x
    return false if x.length
  true

backwards.isEmpty = isEmpty


# reduce :: (a -> b) -> a -> Array|Object|"any" -> b
reduce = (f, acc, x) ->
  if isArray x
    acc = [] if not acc?
    acc = f acc, value, key, x for value, key in x
  else if isObject x
    acc = {} if not acc?
    acc = f acc, value, key, x for own key, value of x
  else
    acc = f acc, x
  acc

backwards.reduce = autoCurry reduce


forEach = (f, xs) ->
  reduce ((acc, x, i, xs) -> f x, i, xs), xs, xs
  undefined

backwards.forEach = autoCurry forEach


map = (f, x) ->
  if isArray x or isArguments x
    reduce (acc, value, index, array) ->
      val = f value, index, array
      acc.push val if val
      acc
    , [], x
  else if isObject x
    reduce (acc, value, key, object) ->
      val      = f value, key, object
      acc[key] = val if val
      acc
    , {}, x
  else
    reduce (acc, value) ->
      f value
    , undefined, x

backwards.map = autoCurry map


filter = (f, x) ->
  map (value, index, array) ->
    value if f value, index, array
  , x

backwards.filter = autoCurry filter


###*
The copy function takes an Object and returns a fresh copy of 
the Object. 

@method copy
@param x {"any"} The Object you wish to copy. 
@return {"any"} A fresh copy of the given Object. 
@public
@example
    copy( [1, 2, 3] );                  // [1, 2, 3]
    copy( { id: 1, name: "string" } );  // { id: 1, name: "string" }
###

copy           = backwards.map identity
backwards.copy = copy


###*
The flatten function takes an Array of Arrays and flattens 
the Array one level. 

@method flatten
@param x {Array} The Array you wish to flatten. 
@return {Array} A flattened Array. 
@public
@example
    var array = [[1, 2], [3, 4], [5, 6]];

    flatten( array ); // [1, 2, 3, 4, 5, 6]
###

flatten           = backwards.reduce append, []
backwards.flatten = flatten


###*
The indexOf function returns the first index at which a given element can be found in the array, or -1 if it is not present.

If the index is greater than or equal to the array's length, -1 is returned, which means the array will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the array. Note: if the provided index is negative, the array is still searched from front to back. If the calculated index is less than 0, then the whole array will be searched. 

@method indexOf
@param search {"mixed"} The element to locate in the array.
@param i {Number} The index to start the search at. 
@param x {Array} The Array you wish to search in. 
@return {Number} The first index at which a given element can be found in the Array, or -1 if not found. 
@public
@example
    var array = [2, 5, 9];

    indexOf( 2,  0, array );  //  0
    indexOf( 7,  0, array );  // -1
    indexOf( 9,  2, array );  //  2
    indexOf( 2, -1, array );  // -1
    indexOf( 2, -3, array );  //  0
###

indexOf = (search, i, x) ->
  len = x.length

  if len is 0 or i >= len
    return -1
  else if i < 0
    i = len + i
    if i < 0
      i = 0

  while i < len
    return i if x[i] is search or isNaN( search ) and isNaN( x[i] )
    i++
  -1

backwards.indexOf = autoCurry indexOf


###*
The contains function returns true if a given element can be found in the array, or false if it is not present.

If the index is greater than or equal to the array's length, false is returned, which means the array will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the array. Note: if the provided index is negative, the array is still searched from front to back. If the calculated index is less than 0, then the whole array will be searched. 

@method contains
@param search {"mixed"} The element to locate in the array.
@param i {Number} The index to start the search at. 
@param x {Array} The Array you wish to search in. 
@return {Boolean} Returns true if *search* is found in the *Array*, or false if it is not found. 
@public
@example
    var array = [1, 2, 3, NaN];

    contains( 2,   0, array );  // true
    contains( 4,   0, array );  // false
    contains( 3,   3, array );  // false
    contains( 3,  -2, array );  // true
    contains( NaN, 0, array );  // true
###

contains = (search, i, x) ->
  ( indexOf search, i, x ) > -1

backwards.contains = autoCurry contains


###*
It takes a predicate function and an array and returns true if some of the values in the array conforms with the predicate function, or false if not. It returns false if given an empty array. 

@method some
@param f {Function} A predicate function. 
@param xs {Array} The array you wish to check. 
@return {Boolean} Returns true if some of the values in the array conforms with the predicate function, or false if not. It returns false if given an empty array. 
@public
@example
    var predicate = function (x) { return x > 10 };

    some( predicate, [12, 5, 8, 1, 4] );  // true
    some( predicate, [2, 5, 8, 1, 4] );   // false
    some( predicate, [] );                // false
###

some = (f, xs) ->
  return true for x in xs when f x
  false

backwards.some = autoCurry some


###*
It takes a predicate function and an array and returns true if every value in the array conforms with the predicate function, or false if not. It returns true if given an empty array. 

@method every
@param f {Function} A predicate function. 
@param xs {Array} The array you wish to check. 
@return {Boolean} Returns true if every value in the array conforms with the predicate function, or false if not. It returns true if given an empty array. 
@public
@example
    var predicate = function (x) { return x > 10 };

    every( predicate, [12, 54, 18, 130, 44] );  // true
    every( predicate, [12, 5, 8, 130, 44] );    // false
    every( predicate, [] );                     // true
###

every = (f, xs) ->
  return false for x in xs when not f x
  true

backwards.every = autoCurry every


either = (a, b) ->
  if b then b else a

backwards.either = autoCurry either


maybe = (f, x) ->
  if x then f x else undefined

backwards.maybe = autoCurry maybe


###*
Extracts a subset of the given object, from the beginning to *i*. 

@method take
@param i {Number} The number of indexes you wish to extract
@param x {Array|String} An Array or a String
@return {Array|String} A subset of *x* from the beginning to *i*
@public
@example
    take( 3, [1, 2, 3, 4, 5] );   // [1, 2, 3]
    take( 5, "Hello World!" );    // "Hello"
    ;
###

take = (i, x) ->
  return x[0...i]

backwards.take = autoCurry take


###*
Drops a subset of the given object, from the beginning to *i*, and returns the rest of the object. 

@method drop
@param i {Number} The number of indexes you wish to extract
@param x {Array|String} An Array or a String
@return {Array|String} A subset of *x* from index *i* to the end
@public
@example
    drop( 3, [1, 2, 3, 4, 5] );   // [4, 5]
    drop( 6, "Hello World!" );    // "World!"
###

drop = (i, x) ->
  return x[i...x.length]

backwards.drop = autoCurry drop

# toString = (x) ->
#   # if x then x.toString()
#   if isArray x then "[#{ x.toString() }]"
#   else if isObject x then "{#{ reduce toString, '', x }}"
#   else if x is false then "false"
#   else if x is 0 then "0"
#   else "undefined"

# console = ( window.console = window.console or {} )
console = console or {}
forEach (method) ->
  console[ method ] = noop if not console[ method ]
  undefined
, [
  "assert"
  "clear"
  "count"
  "debug"
  "dir"
  "dirxml"
  "error"
  "exception"
  "group"
  "groupCollapsed"
  "groupEnd"
  "info"
  "log"
  "markTimeline"
  "profile"
  "profileEnd"
  "table"
  "time"
  "timeEnd"
  "timeStamp"
  "trace"
  "warn"
]

backwards.log = (x) ->
  console.log x
  x


# Export backwards object
# =======================

(( root, name, f ) ->
  # Register as a named AMD module
  if define? and define.amd
    define name, [], f

  # Register as a CommonJS-like module
  else if exports?
    if module? and module.exports
      module.exports = f()
    else
      exports[name] = f()

  # Register as a global object on the window
  else
    root[name] = f()
  
  undefined
)( this, "backwards", () -> backwards )

### 

# { error, success } = options

# Game Loop
while running
  now = Date.now()
  delta = now - lastTime
  buffer += delta
  while buffer >= TICK
    update TICK
    buffer -= TICK
  render()
  lastTime = now

# map :: (a -> b) -> [a] -> [b]
map = (f, [x, xs...]) ->
  if x is undefined
    []
  else
    [f(x), map(f, xs)...]

# length :: [a] -> Int
length = ([x, xs...]) ->
  if x is undefined
    0
  else
    1 + length xs

###