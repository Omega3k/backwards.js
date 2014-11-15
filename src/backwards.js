(function (root, name, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a named module.
    define(name, [], factory);
  } else if (typeof exports !== 'undefined') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.

    // module.exports = factory();
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory();
    }
    exports[name] = factory();
  } else {
    // Browser globals (root is window)
    root[name] = factory();
  }
}(this, 'backwards', function () {
  'use strict';
  
  /* TODOs

   * Misc
     - http://opensource.org/osd-annotated

   * Ideas For Improvements / Extensions
     - Make an event system inspired by: 
       - https://github.com/postaljs/postal.js
     - etc ...

   * Test Results: 
      - Linux, Chrome - Promise is not defined

   * Make special-methods for: 
      - hasNativeMethod(x.map, function(){}) If the native method exists then return x.map(f), else return polyfill(f, x)
      - min
      - max
      - sort
      - etc ...
      
   * Make replacement-methods for: 
      - indexOf
      - etc ...
      
   * Refactor: 
      - map so that it uses the 'hasNativeMethod'
      - filter
      - reduce
      - split?
      - replace?
      - etc ...
   */


  /**
  A set of utility functions for functional programming in JavaScript. 

  @module backwards
  @main backwards
  @class backwards
  @static
  */
  
  var module      = {}
    , arrayProto  = Array.prototype
    , objectProto = Object.prototype
    , slice       = arrayProto.slice
    , toString    = objectProto.toString
  ;
  

  /**
  This function is an internal function that is used by 'autoCurry' to create curried functions from functions that take more than one parameter. 

  @method curry
  @param f {Function} The function to be curried. 
  @return {Function} A curried function. 
  @private
  */

  //+ curry :: Function -> Function
  function curry (f) {
    var args = slice.call(arguments, 1);
    return function () {
      return f.apply(this, args.concat(slice.call(arguments, 0)));
    };
  }


  /**
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
  */

  //+ autoCurry :: Function -> Number -> Function
  function autoCurry (f, length) { 
    length = length || f.length;
    var newFunction = function () {
      if (arguments.length < length) {
        return autoCurry(
          curry.apply(this, [f].concat(slice.call(arguments))), length - arguments.length);
      } else {
        return f.apply(this, arguments);
      }
    }; 
    newFunction.toString = function () { return f.toString(); } ;
    newFunction.curried = true; 
    return newFunction; 
  }

  module.autoCurry = autoCurry;
  
  // Function.prototype.autoCurry = function(n) {
  //   return autoCurry(this, n);
  // };


  /**
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
  */

  //+ compose :: Function, ... -> Function
  function compose () {
    var fs = arguments;
    return function () {
      var args = arguments
        , i    = fs.length;

      while (i--) {
        args = [fs[i].apply(this, args)];
      }
      return args[0];
    };
  }

  module.compose = compose;


  /** 
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
  */
  
  //+ isTypeOf :: String -> a -> Boolean
  var isTypeOf = autoCurry(function (type, x) {
    return toString.call(x) === '[object ' + type + ']';
  });

  module.isTypeOf = isTypeOf;


  /** 
  Check if an Object is an Arguments object. 

  @method isArguments
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isArguments( arguments )  // True
        , failed = isArguments( false )      // False
      ;
  */
  
  //+ isArguments :: a -> Boolean
  var isArguments = (function () {
    if (isTypeOf('Arguments', arguments)) {
      return isTypeOf('Arguments');
    } else {
      return function (x) {
        return x !== null && x !== void 0 && x.hasOwnProperty('callee');
      };
    }
  }()); 

  module.isArguments = isArguments;


  /** 
  Check if an Object is an Array. 

  @method isArray
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isArray( [1, 2, 3] )  // True
        , failed = isArray( false )      // False
      ;
  */
  
  //+ isArray :: a -> Boolean
  var isArray    = Array.isArray || isTypeOf('Array');
  module.isArray = isArray;


  /** 
  Check if an Object is a Boolean. 

  @method isBoolean
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isBoolean( true )  // True
        , failed = isBoolean( 0 )     // False
      ;
  */
  
  //+ isBoolean :: a -> Boolean
  function isBoolean (x) {
    return x === true || x === false || isTypeOf('Boolean', x);
  }

  module.isBoolean = isBoolean;
  

  //+ isDate :: a -> Boolean
  var isDate    = isTypeOf('Date');
  module.isDate = isDate;

  
  //+ isFinite :: a -> Boolean
  function isFinite (x) {
    return isFinite(x) && !isNaN(parseFloat(x));
  }

  module.isFinite = isFinite;


  /** 
  Check if an Object is a Function. 

  @method isFunction
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isFunction( function () {} )  // True
        , failed = isFunction( false )           // False
      ;
  */
  
  //+ isFunction :: a -> Boolean
  var isFunction = (function () {
    if (typeof /./ !== 'function') {
      return function (x) {
        return typeof x === 'function';
      };
    } else {
      return isTypeOf('Function');
    }
  }());

  module.isFunction = isFunction;

  
  //+ isNaN :: a -> Boolean
  function isNaN (x) {
    return isNumber(x) && x !== +x;
  }

  module.isNaN = isNaN;


  /** 
  Check if an Object is a Null object. 

  @method isNull
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isNull( null )    // True
        , failed = isNull( false )   // False
      ;
  */
  
  //+ isNull :: a -> Boolean
  function isNull (x) {
    return x === null || isTypeOf('Null', x);
  }

  module.isNull = isNull;


  /** 
  Check if an Object is a Number. 

  @method isNumber
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isNumber( 123 )     // True
        , failed = isNumber( false )   // False
      ;
  */
  
  //+ isNumber :: a -> Boolean
  var isNumber    = isTypeOf('Number');
  module.isNumber = isNumber;


  /** 
  Check if an Object is an Object. 

  @method isObject
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isObject( {} )      // True
        , failed = isObject( false )   // False
      ;
  */
  
  //+ isObject :: a -> Boolean
  function isObject (x) {
    if (x === null || x === void 0 || isArguments(x)) {
      return false;
    } else {
      return isTypeOf('Object', x);
    }
  }

  module.isObject = isObject;

  
  //+ isPromise :: a -> Boolean
  var isPromise    = isTypeOf('Promise');
  module.isPromise = isPromise;

  
  //+ isRegExp :: a -> Boolean
  var isRegExp    = isTypeOf('RegExp');
  module.isRegExp = isRegExp;


  /** 
  Check if an Object is a String. 

  @method isString
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isString( 'string' )  // True
        , failed = isString( false )     // False
      ;
  */
  
  //+ isString :: a -> Boolean
  var isString    = isTypeOf('String');
  module.isString = isString;


  /** 
  Check if an Object is undefined. 

  @method isUndefined
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isUndefined( void 0 )   // True
        , failed = isUndefined( false )    // False
      ;
  */
  
  //+ isUndefined :: a -> Boolean
  function isUndefined (x) {
    return x === void 0 || isTypeOf('Undefined', x);
  }

  module.isUndefined = isUndefined;


  //+ exists :: a -> Boolean
  function exists (x) {
    return x !== null && x !== void 0;
  }

  module.exists = exists;

  // Simply for checking if an Object is empty.
  function isObjectEmpty (x) {
    var key;
    for (key in x) {
      return false;
    }
    return true;
  }

  // Simply for checking if an Array or Arguments object is empty.
  function isArrayEmpty (x) {
    if (x.length) {
      return false;
    } else {
      return true;
    }
  }


  //+ reduce :: ( Function -> a -> a ) -> a
  function reduce (f, acc, x) {
    var i, len;

    if (isArray(x) || isArguments(x)) {
      len = x.length;
      for (i = 0; i < len; i++) {
        if (i in x) {
          acc = f(acc, x[i], i, x);
        }
      }
    } else {
      for (i in x) {
        if (x.hasOwnProperty(i)) {
          acc = f(acc, x[i], i, x);
        }
      }
    }

    return acc;
  }

  module.reduce = autoCurry(reduce);


  // Internal function used with .forEach & .map
  function __reducingFunction (f, acc, x) {
    return reduce(function (acc, val, key, obj) {
      acc[key] = f(val, key, obj);
      return acc;
    }, acc, x);
  }


  function forEach (f, x) {
    if ( isArray(x) || isObject(x) || isArguments(x) ) {
      return __reducingFunction( f, x, x );
    } else {
      return f(x);
    }
  }

  module.forEach = autoCurry(forEach);

  
  //+ map :: Function -> a -> b
  function map (f, x) {
    if (isArray(x) || isArguments(x)) {
      return __reducingFunction( f, [], x );
    }
    else if (isObject(x)) {
      return __reducingFunction( f, {}, x );
    }
    else {
      return f(x);
    }
  }

  module.map = autoCurry(map);

  //+ promiseMap :: Function -> Promise -> a
  // promiseMap = function (f, x) {
  //   return x.then(function (data) {
  //     return f(data);
  //   }, function (error) {
  //     throw error;
  //   });
  // };
  
  //+ filter :: Function -> Array -> Array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  function filter (f, x) {
    return reduce(function (acc, val, i, arr) {
      if ( f(val, i, arr) ) {
        acc.push(val);
      }
      return acc;
    }, [], x);
  }

  module.filter = autoCurry(filter);


  /** 
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
  */

  //+ indexOf :: ( a -> Number -> Array ) -> Number
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  function indexOf (search, i, x) {
    var len = x.length;

    if (len === 0 || i >= len) {
      return -1;
    } else if (i < 0) {
      i = len + i;
      if (i < 0) { i = 0; }
    }

    while(i < len){
      if (i in x && x[i] === search) {
        return i;
      }
      i++;
    }

    return -1;
  }

  module.indexOf = autoCurry(indexOf);


  /** 
  The function determines whether an array contains a certain element, returning true or false as appropriate.

  @method contains
  @param search {"mixed"} The value you wish to check if exists.
  @param i {Number} The index of where the begin searching the Array.
  @param x {Array} The Array you wish to search.
  @return {Boolean} A Boolean value. 
  @public
  @example
      var array = [1, 2, 3, NaN];

      contains( 2, 0, array )   // True
      contains( 4, 0, array )   // False
      contains( 3, 3, array )   // False
      contains( 3, -2, array )  // False
      contains( NaN, 0, array ) // True
      contains( 2, -8, array )  // True
  */

  //+ contains :: ( a -> Number -> Array ) -> Number
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/contains
  function contains (search, i, x) {
    var len = x.length
      , val;

    if (len === 0 || i >= len) {
      return -1;
    } else if (i < 0) {
      i = len + i;
      if (i < 0) { i = 0; }
    }

    while(i < len){
      val = x[i];
      if (i in x && val === search || isNaN(search) && isNaN(val)) {
        return true;
      }
      i++;
    }

    return false;
  }

  module.contains = autoCurry(contains);


  /** 
  The function tests whether all elements in the array pass the test implemented by the provided function.

  The function executes the provided callback function once for each element present in the array until it finds one where callback returns a falsy value (a value that becomes false when converted to a Boolean). If such an element is found, the every method immediately returns false. Otherwise, if callback returned a true value for all elements, every will return true. callback is invoked only for indexes of the array which have assigned values; it is not invoked for indexes which have been deleted or which have never been assigned values.

  @method every
  @param f {Function} The function to test for each element, taking three arguments. 
  @param f.value {"any"} The value of the current index of the array. 
  @param f.index {Number} The current index of the array. 
  @param f.array {Array} The array itself. 
  @param x {Array} The Array you wish to search.
  @return {Boolean} A Boolean value. 
  @public
  @example
      function isBiggerThanTen(value, index, array) {
        return value > 10;
      }

      var failed = every( isBiggerThanTen, [12, 5, 8, 130, 44] )    // False
        , passed = every( isBiggerThanTen, [12, 54, 18, 130, 44] )  // True
      ;
  */

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  function every (f, x) {
    var i = 0, len = x.length;
    while (i < len) {
      if (i in x && !f(x[i], i, x)) {
        return false;
      }
      i++;
    }
    return true;
  }

  module.every = autoCurry(every);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  function some (f, x) {
    var i = 0, len = x.length;
    while (i < len) {
      if (i in x && f(x[i], i, x)) {
        return true;
      }
      i++;
    }
    return false;
  }

  module.some = autoCurry(some);

  function either (x, y) {
    return y ? y : x;
  }

  module.either = autoCurry(either);

  function maybe (f, x) {
    return x ? f(x) : void 0;
  }

  module.maybe = autoCurry(maybe);

  module.trampoline = function (f) {
    var result = f;
    while (result instanceof Function) {
      result = result();
    }
    return result;
  };

  //+ pluck :: String|Number -> a -> a
  function pluck (key, x) {
    return x[key];
  }

  module.pluck = autoCurry(pluck);

  function push (val, x) {
    x.push(val);
  }

  module.push = autoCurry(push);
  
  //+ replace :: String -> String -> String -> String
  function replace (reg, s, x) {
    return x.replace(reg, s);
  }

  module.replace = autoCurry(replace);
  
  //+ split :: String -> String -> Array
  function split (s, x) {
    return x.split(s);
  }

  module.split = autoCurry(split);

  //+ join :: a -> a -> a
  function concat (y, x) {
    return x.concat(y);
  }

  module.concat = autoCurry(concat);

  function splice (i, howMany, x) {
    return x.splice(i, howMany);
  }

  module.splice = autoCurry(splice);
  
  return module;
}));