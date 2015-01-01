'use strict'


###*
A set of utility functions for functional programming in Javascript.

@module backwards
@main backwards
@class backwards
@static
###
backwards   = {}

arrayProto  = Array.prototype
objectProto = Object.prototype
slice       = arrayProto.slice
toString    = objectProto.toString


###*
This function is an internal function that is used by 'autoCurry' to create curried functions from functions that take more than one parameter. 

@method curry
@param f {Function} The function to be curried. 
@return {Function} A curried function. 
@private
###
# curry :: Function -> Function
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
# autoCurry :: Function -> Number -> Function
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
@param function* {Function} Two or more functions that should be composed together. 
@return {Function} The result of composing all the argument functions. 
@public
@example
    function addOne ( x ) {
      return x + 1;
    }

    function timesTwo ( x ) {
      return x * 2;
    }

    var timesTwoPlusOne = compose( addOne, timesTwo ) // A composed function
      , five            = timesTwoPlusOne( 2 )        // 5
      , nine            = timesTwoPlusOne( 4 )        // 9
    ;
###
# compose :: Function, ... -> Function
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
      , passed    = isBoolean( true )     // True
      , failed    = isBoolean( {} )       // False
    ;
###
# isTypeOf :: String -> a -> Boolean
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
    var passed = isArguments( arguments )  // True
      , failed = isArguments( false )      // False
    ;
###
# isArguments :: a -> Boolean
isArguments = do () ->
  if isTypeOf 'Arguments', arguments then isTypeOf 'Arguments'
  else (x) ->
    x? and x.hasOwnProperty 'callee'

backwards.isArguments = isArguments


###*
Check if an Object is an Array. 

@method isArray
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isArray( [1, 2, 3] )  // True
      , failed = isArray( false )      // False
    ;
###
# isArray :: a -> Boolean
isArray           = Array.isArray or isTypeOf 'Array'
backwards.isArray = isArray


###*
Check if an Object is a Boolean. 

@method isBoolean
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isBoolean( true )  // True
      , failed = isBoolean( 0 )     // False
    ;
###
# isBoolean :: a -> Boolean
isBoolean = (x) ->
  x is true or x is false or isTypeOf 'Boolean', x

backwards.isBoolean = isBoolean


# isDate :: a -> Boolean
isDate           = isTypeOf 'Date'
backwards.isDate = isDate


# isFinite :: a -> Boolean
isFinite = (x) ->
  isFinite(x) and not isNaN parseFloat x

backwards.isFinite = isFinite


###*
Check if an Object is a Function. 

@method isFunction
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isFunction( function () {} )  // True
      , failed = isFunction( false )           // False
    ;
###
# isFunction :: a -> Boolean
isFunction = do () ->
  if typeof /./ isnt 'function'
    (x) -> typeof x is 'function'
  else isTypeOf 'Function'

backwards.isFunction = isFunction


# isNaN :: a -> Boolean
isNaN           = (x) -> isNumber(x) and x isnt +x
backwards.isNaN = isNaN


###*
Check if an Object is a Null object. 

@method isNull
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isNull( null )    // True
      , failed = isNull( false )   // False
    ;
###
# isNull :: a -> Boolean
isNull           = (x) -> x is null or isTypeOf 'Null', x
backwards.isNull = isNull


###*
Check if an Object is a Number. 

@method isNumber
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isNumber( 123 )     // True
      , failed = isNumber( false )   // False
    ;
###
# isNumber :: a -> Boolean
isNumber           = isTypeOf 'Number'
backwards.isNumber = isNumber


###*
Check if an Object is an Object. 

@method isObject
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isObject( {} )      // True
      , failed = isObject( false )   // False
    ;
###
# isObject :: a -> Boolean
isObject = (x) ->
  if not x? or isArguments x then false
  else isTypeOf 'Object', x

backwards.isObject = isObject


# isPromise :: a -> Boolean
isPromise           = isTypeOf 'Promise'
backwards.isPromise = isPromise


# isRegExp :: a -> Boolean
isRegExp           = isTypeOf 'RegExp'
backwards.isRegExp = isRegExp


###*
Check if an Object is a String. 

@method isString
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isString( 'string' )  // True
      , failed = isString( false )     // False
    ;
###
# isString :: a -> Boolean
isString           = isTypeOf 'String'
backwards.isString = isString


###*
Check if an Object is undefined. 

@method isUndefined
@param x {"any"} The Object you wish to check the type of. 
@return {Boolean} A Boolean value. 
@public
@example
    var passed = isUndefined( void 0 )   // True
      , failed = isUndefined( false )    // False
    ;
###
# isUndefined :: a -> Boolean
isUndefined = (x) ->
  x is undefined or isTypeOf 'Undefined', x

backwards.isUndefined = isUndefined


# exists :: a -> Boolean
exists           = (x) -> x?
backwards.exists = exists


# isObjectEmpty :: Object -> Boolean
isObjectEmpty = (x) ->
  return false for own prop of x
  true


# isArrayEmpty :: Array -> Boolean
isArrayEmpty = (x) -> if x.length then false else true

backwards.isEmpty = (x) ->
  if isArray x then isArrayEmpty x
  else if isObject x then isObjectEmpty x


# arrayReduce :: (a -> b) -> a -> [a] -> [b]
arrayReduce = (f, acc, xs) ->
  acc = f acc, val, i, xs for val, i in xs
  acc


# objectReduce :: (a -> b) -> a -> {a} -> {b}
objectReduce = (f, acc, x) ->
  acc = f acc, val, i, x for own val, i of x
  acc


# reduce :: (a -> b) -> a -> Array|Object -> b
reduce = (f, acc, x) ->
  if isArray x then arrayReduce f, acc, x
  else if isObject x then objectReduce f, acc, x
  else
    acc = f x
    acc

backwards.reduce = autoCurry reduce

backwards.forEach = autoCurry (f, xs) ->
  reduce ((acc, x, i, xs) -> f x, i, xs), xs, xs
  undefined


arrayFilter = (f, xs) -> x for x in xs when f x
filterOne   = (f, x) -> if f x then x else null

filter = (f, x) ->
  if isArray x then arrayFilter f, x
  else filterOne f, x

backwards.filter = autoCurry filter

arrayMap = ( f, xs ) -> f x for x in xs

objectMap = ( f, xs ) -> 
  acc = {}
  for own key, x of xs
    acc[key] = f x
  acc

map = (f, xs) ->
  if isArray xs then arrayMap f, xs
  else if isObject xs then objectMap f, xs
  else f xs

backwards.map = autoCurry map


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

    indexOf( 2, 0, array );   //  0
    indexOf( 7, 0, array );   // -1
    indexOf( 9, 2, array );   //  2
    indexOf( 2, -1, array );  // -1
    indexOf( 2, -3, array );  //  0
###
arrayIndexOf = (search, i, x) ->
  len = x.length

  if len is 0 or i >= len
    return -1
  else if i < 0
    i = len + i
    if i < 0
      i = 0

  while i < len
    return i if x[i] is search
    i++
  -1

indexOf           = arrayIndexOf
backwards.indexOf = autoCurry indexOf


arrayContains = (search, i, x) ->
  len = x.length

  if len is 0 or i >= len
    return false
  else if i < 0
    i = len + i
    if i < 0
      i = 0

  while i < len
    if x[i] is search or isNaN( search ) and isNaN( x[i] )
      return true
    i++
  false

contains           = arrayContains
backwards.contains = autoCurry contains

arraySome = (f, xs) ->
  return true for x in xs when f x
  false

some           = arraySome
backwards.some = autoCurry some

arrayEvery = (f, xs) ->
  return false for x in xs when not f x
  true

every           = arrayEvery
backwards.every = autoCurry every

either           = (a, b) -> if b then b else a
backwards.either = autoCurry either

maybe           = (f, x) -> if x then f x else undefined
backwards.maybe = autoCurry maybe


###*
Extracts a subset of the given object, from the beginning to *int*. 

@method take
@param int {Number} The number of indexes you wish to extract
@param x {Array|String} An Array or a String
@return {Array|String} A subset of *x* from the beginning to *int*
@public
@example
    var firstThree  = take( 3 )
      , oneTwoThree = firstThree( [1, 2, 3, 4, 5] ) // [1, 2, 3]
      , hello       = take( 5, 'Hello World!' )     // 'Hello'
    ;
###
take = (int, x) ->
  if isArray x  or isString x then x[0...int]
  else throw new Error 'take() only works on Arrays and Strings'

backwards.take = autoCurry take


###*
Drops a subset of the given object, from the beginning to *int*, and returns the rest of the object. 

@method drop
@param int {Number} The number of indexes you wish to extract
@param x {Array|String} An Array or a String
@return {Array|String} A subset of *x* from index *int* to the end
@public
@example
    var firstThree = drop( 3 )
      , fourFive   = firstThree( [1, 2, 3, 4, 5] )  // [4, 5]
      , world      = drop( 6, 'Hello World!' )      // 'World!'
###
drop = (int, x) ->
  if isArray x  or isString x then x[int...x.length]
  else throw new Error 'drop() only works on Arrays and Strings'

backwards.drop = autoCurry drop


# Export backwards object
# =======================

(( root, name, f ) ->
  # Register as a named AMD module
  if define? and define.amd then define name, [], f
  # Register as a CommonJS-like module
  else if exports?
    if module? and module.exports then module.exports = f()
    else exports[name] = f()
  # Register as a global object on the window
  else window[name] = f()
  # else root[name] = f()
  return
)( this, 'backwards', () -> backwards )

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