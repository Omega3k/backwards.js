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


###*
Check if an Object is a Date. 

@method isDate
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isDate( new Date() )   // true
      , failed = isDate( +new Date() )  // false
      , fails  = isDate( false )        // false
    ;
###

isDate           = isTypeOf "Date"
backwards.isDate = isDate


###*
Check if an Object is an Error. 

@method isError
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isError( new Error() )       // true
      , passes = isError( new TypeError() )   // false
      , failed = isError( false )             // false
    ;
###

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
      , passed = isFunction( noop )             // true
      , passes = isFunction( new Function() )   // true
      , failed = isFunction( false )            // false
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


###*
Check if an Object is a Promise. 

@method isPromise
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var promise = new Promise(function (resolve, reject) {
      resolve( "I am a promise" );
    });

    isPromise( promise );   // true
    isPromise( {} );        // false
###

isPromise = (x) ->
  return true if isTypeOf "Promise", x
  if x?
    return true if typeof x.then is "function"
  false

backwards.isPromise = isPromise


###*
Check if an Object is a regular expression ( RegExp ). 

@method isRegExp
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isRegExp( /./ )            // true
      , passes = isRegExp( new RegExp() )   // true
      , failed = isRegExp( false )          // false
    ;
###

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


###*
forEach executes the provided callback once for each element present in the array in ascending order. It is not invoked for indexes that have been deleted or elided. However, it is executed for elements that are present and have the value undefined.

callback is invoked with three arguments:

    the element value
    the element index, key or undefined
    the array or object being traversed or undefined

The range of elements processed by forEach is set before the first invocation of callback. Elements that are appended to the array after the call to forEach begins will not be visited by callback. If the values of existing elements of the array are changed, the value passed to callback will be the value at the time forEach visits them; elements that are deleted before being visited are not visited.

@method forEach
@param f {Function} The function you wish to execute over each element in the object. 
@param f.value {"any"} The element value. 
@param f.key {Number|String|undefined} The element index, key or undefined. 
@param f.object {Array|Object|undefined} The array or object being traversed or undefined. 
@param x {"any"} The object you wish to iterate over. 
@return {undefined}
@public
@example
    var f = function (value, key, object) {
      alert( value, key );
    };

    forEach( f, [1, 2, 3] );                  // undefined
    forEach( f, { id: 1, name: "string" } );  // undefined
    forEach( f, "Hello folks!" );             // undefined
###

# forEach = (f, xs) ->
#   reduce ((acc, x, i, xs) -> f x, i, xs), xs, xs
#   return

forEach = (f, x) ->
  if isArray x
    f value, key, x for value, key in x
  else if isObject x
    f value, key, x for own key, value of x
  else
    f x
  return

backwards.forEach = autoCurry forEach


###*
map calls a provided callback function (f) once for each element in an array, in ascending order, and constructs a new array from the results. callback is invoked only for indexes of the array which have assigned values; it is not invoked for indexes that are undefined, those which have been deleted or which have never been assigned values.

callback is invoked with three arguments:

    the element value
    the element index, key or undefined
    the array or object being traversed or undefined

map does not mutate the array on which it is called (although callback, if invoked, may do so).

The range of elements processed by map is set before the first invocation of callback. Elements which are appended to the array after the call to map begins will not be visited by callback. If existing elements of the array are changed, or deleted, their value as passed to callback will be the value at the time map visits them; elements that are deleted are not visited.

@method map
@public
@param f {Function} The function you wish to execute over each element in the object. 
@param f.value {"any"} The element value. 
@param f.key {Number|String|undefined} The element index, key or undefined. 
@param f.object {Array|Object|undefined} The array or object being traversed or undefined. 
@param x {"any"} The object you wish to iterate over. 
@return {"any"}
@example
    var addOne = function (x) {
      return x + 1;
    };

    map( addOne, [1, 2, 3] );                  // [2, 3, 4]
    map( addOne, { id: 1, name: "string" } );  // ["id1", "name1"]
    map( addOne, "Hello folks!" );             // "Hello folks!1"
###

__arrayMap = (f, xs) ->
  for value, index in xs
    f value, index, xs if value

__objectMap = (f, obj) ->
  for own key, value of obj
    f value, key, obj if value

map = (f, x) ->
  if isArray x then __arrayMap f, x
  else if isObject x then __objectMap f, x
  else if x and isFunction x.map then x.map f
  else if isPromise x then x.then f
  else if x then f x

backwards.map = autoCurry map


filter = (f, x) ->
  if isArray x
    acc = []
    map (value, index, array) ->
      acc.push value if f value, index, array
    , x
    acc
  else x if f x

backwards.filter = autoCurry filter


keys = (x) ->
  acc = []
  forEach (value, key, object) ->
    acc.push key
  , x
  acc


###*
__reduce__ executes the callback function once for each element present in the array, excluding holes in the array, receiving four arguments: the initial value (or value from the previous callback call), the value of the current element, the current index, and the array over which iteration is occurring.

The callback function (__f__) is invoked with four arguments:

    The initial value (or return value from the previous callback invocation). 
    The element value. 
    The element index, key or undefined. 
    The array or object being traversed or undefined. 

The first time the callback function (__f__) is called, __accumulator__ and __value__ can be one of two values. If initial value (__acc__) is provided in the call to reduce, then __accumulator__ will be equal to initial value and __value__ will be equal to the first value in the array. If no initial value (__acc__) was provided, then __accumulator__ will be equal to the first value in the array and __value__ will be equal to the second.

If the array or object (__x__) is empty and no initial value (__acc__) is provided, a TypeError will be thrown. If the array or object (__x__) only has one element (regardless of position) and no initial value (__acc__) is provided, or if initial value (__acc__) is provided but the array or object (__x__) is empty, the solo value will be returned without calling callback function (__f__).

@method reduce
@public
@param f {Function} The callback function. 
@param f.accumulator {"any"} The initial value (or return value from the previous callback invocation). 
@param f.value {"any"} The element value. 
@param f.key {Number|String|undefined} The element index, key or undefined. 
@param f.object {Array|Object|undefined} The array or object being traversed or undefined. 
@param acc {"any"} The initial value. 
@param x {"any"} The object you wish to reduce. 
@return {"any"|TypeError} Returns the reduced value, or a TypeError if given an empty object and no initial value.
@example
    var add     = function (a, b) { return a + b; }
      , append  = function (a, b) { return a.concat(b); }
      , flatten = reduce( append, [] )
    ;

    reduce( add, 0        , [0, 1, 2, 3] );   // 6
    reduce( add, undefined, [0, 1, 2, 3] );   // 6
    flatten( [[0, 1], [2, 3], [4, 5]] );      // [0, 1, 2, 3, 4, 5]
###

reduce = (f, acc, x) ->
  if not acc? and isEmpty x
    throw new TypeError "Reduce of empty object with no initial value"

  if isArray(x) or isObject(x)
    forEach (value, key, object) ->
      if acc is undefined then acc = value
      else acc = f acc, value, key, object
      return
    , x
  else
    acc = f acc, x
  acc

backwards.reduce = autoCurry reduce


max = backwards.reduce (max, num) ->
  if max > num then max else num
, 0

min = backwards.reduce (min, num) ->
  if min < num then min else num
, 0


###*
The extend function takes two or more objects and returns the first object extended with the properties (and values) of the other objects in ascending order. 

@method extend
@param acc {Object} The Object you wish to extend. 
@param objects* {Object} The objects you wish to extend. 
@return {Object} Returns the first object extended with the other objects properties and values in ascending order. 
@public
@example
    var obj = {
      id    : 1,
      age   : 29,
      gender: "male",
      name  : "John Doe"
    };

    extend( obj, { age: 30, name: "John Doe Sr." } );
    // { id: 1, age: 30, gender: "male", name: "John Doe Sr." }

    extend( obj, { id: 2 } );
    // { id: 2, age: 30, gender: "male", name: "John Doe Sr." }

    extend( {}, obj, { id: 2, age: 0, name: "John Doe Jr." } );
    // { id: 2, age: 0, gender: "male", name: "John Doe Jr." }
###

extend = (acc, objects...) ->
  acc = acc or {}
  forEach (object) ->
    forEach (value, key) ->
      acc[key] = value
      return
    , object
  , objects
  acc

backwards.extend = autoCurry extend


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

copy = (x) ->
  if isObject x then extend {}, x
  else map identity, x

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

    every( predicate, [] );                     // true
    every( predicate, [12, 54, 18, 130, 44] );  // true
    every( predicate, [12, 5, 8, 130, 44] );    // false
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
@param i {Number|Array} The number of indexes you wish to extract
@param x {Array|String|Object} An Array, String or Object
@return {Array|String|Object} A subset of *x* from the beginning to *i*
@public
@example
    var array = [1, 2, 3, 4, 5]
      , string = "Hello World!"
      , object = {
          id    : 1,
          age   : 29,
          gender: "male",
          name  : "John Doe"
      }
    ;

    take(  3, array );          // [1, 2, 3]
    take( -2, array );          // [4, 5]
    take(  5, string );         // "Hello"
    take( -6, string );         // "World!"
    take( ['name'], object );   // { name: "John Doe" }
###

first = (i, x) -> x[0...i]
last  = (i, x) -> x[i...x.length]

take = (i, x) ->
  if isNumber i
    if i > 0 then first i, x else last i, x
  else
    acc   = {}
    value = undefined
    forEach (key) ->
      value    = x[key]
      acc[key] = value if value
      return
    , i
    acc

backwards.take = autoCurry take


###*
Drops a subset of the given object, from the beginning to *i*, and returns the rest of the object. 

@method drop
@param i {Number|Array} The number of indexes you wish to extract
@param x {Array|String|Object} An Array, String or Object
@return {Array|String|Object} A subset of *x* from index *i* to the end
@public
@example
    var array = [1, 2, 3, 4, 5]
      , string = "Hello World!"
      , object = {
          id    : 1,
          age   : 29,
          gender: "male",
          name  : "John Doe"
      }
    ;

    drop(  3, array );                        // [4, 5]
    drop( -2, array );                        // [1, 2, 3]
    drop(  6, string );                       // "World!"
    drop( -7, string );                       // "Hello"
    drop( ['id', 'age', 'gender'], object );  // { name: "John Doe" }
###

drop = (i, x) ->
  if isNumber i
    if i > 0 then last i, x else first i, x
  else
    acc = {}
    forEach (value, key) ->
      if not contains key, 0, i
        acc[key] = value
        return
    , x
    acc

backwards.drop = autoCurry drop

# toString = (x) ->
#   # if x then x.toString()
#   if isArray x then "[#{ x.toString() }]"
#   else if isObject x then "{#{ reduce toString, '', x }}"
#   else if x is false then "false"
#   else if x is 0 then "0"
#   else "undefined"

# if window?
#   # console = ( window.console = window.console or {} )
#   console = console or {}
#   forEach (method) ->
#     console[ method ] = noop if not console[ method ]
#     undefined
#   , [
#     "assert"
#     "clear"
#     "count"
#     "debug"
#     "dir"
#     "dirxml"
#     "error"
#     "exception"
#     "group"
#     "groupCollapsed"
#     "groupEnd"
#     "info"
#     "log"
#     "markTimeline"
#     "profile"
#     "profileEnd"
#     "table"
#     "time"
#     "timeEnd"
#     "timeStamp"
#     "trace"
#     "warn"
#   ]

backwards.log = (x) ->
  console.log x
  x


# Export backwards object
# =======================

if define? and define.amd
  define "backwards", [], () -> backwards
else if exports?
  if module? and module.exports then module.exports = backwards
  else exports.backwards = backwards
else if window? then window.backwards = backwards
else return backwards

# (( root, name, f ) ->
#   # Register as a named AMD module
#   if define? and define.amd
#     define name, [], f

#   # Register as a CommonJS-like module
#   else if exports?
#     if module? and module.exports
#       module.exports = f()
#     else
#       exports[name] = f()

#   # Register as a global object on the window
#   else
#     root[name] = f()
  
#   undefined
# )( this, "backwards", () -> backwards )

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