(function() {
  "use strict";

  /**
   * A set of utility functions for funtional programming in JavaScript. 
   * @type {Object}
   * @exports backwards
   * @namespace backwards
   * @author Svein Olav Risdal
   * @copyright 2014 Svein Olav Risdal
   * @license
   * The MIT License (MIT)
   * 
   * Copyright (c) 2014 Svein Olav Risdal
   *
   * Permission is hereby granted, free of charge, to any person obtaining a
   * copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including 
   * without limitation the rights to use, copy, modify, merge, publish, 
   * distribute, sublicense, and/or sell copies of the Software, and to permit 
   * persons to whom the Software is furnished to do so, subject to the 
   * following conditions:
   * 
   * The above copyright notice and this permission notice shall be included
   * in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
   * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
   * DEALINGS IN THE SOFTWARE.
   */
  var I, K, add, append, array, arrayProto, backwards, compose, concat, contains, copy, curry, divide, either, escape, every, exists, extend, filter, first, flatten, forEach, hasOwn, indexOf, isArguments, isArray, isBoolean, isDate, isElement, isEmpty, isError, isFinite, isFunction, isNull, isNumber, isObject, isPromise, isRegExp, isString, isTypeOf, isUndefined, join, keys, last, lines, map, max, maybe, min, multiply, noop, object, objectProto, omit, partition, pick, pluck, push, reduce, slice, some, split, subtract, toArray, toString, unescape, unlines, __curry, _delete,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  backwards = {};

  array = Array;

  arrayProto = array.prototype;

  slice = arrayProto.slice;

  object = Object;

  objectProto = object.prototype;

  toString = objectProto.toString;

  hasOwn = objectProto.hasOwnProperty;

  noop = function() {};

  add = function(a, b) {
    return a + b;
  };

  subtract = function(a, b) {
    return a - b;
  };

  multiply = function(a, b) {
    return a * b;
  };

  divide = function(a, b) {
    return a / b;
  };

  append = function(a, b) {
    return a += b;
  };

  concat = function(a, b) {
    return a.concat(b);
  };

  push = function(a, b) {
    return a.push(b);
  };


  /**
   * [I description]
   * @param {*} x Any value. 
   * @return {*} Any value.
   */

  backwards.I = function(x) {
    return x;
  };

  I = function(x) {
    return x;
  };

  K = function(x) {
    return function() {
      return x;
    };
  };


  /**
  The __VERSION__ property is a string indicating the version of __backwards__ as a string value. 
  
  @property VERSION
  @type String
  @final
  @public
   */

  backwards.VERSION = "undefined";


  /**
  The __CLIENT_SIDE__ property is a boolean indicating if the current environment is client-side (a browser) or not. 
  
  @property CLIENT_SIDE
  @type Boolean
  @final
  @public
   */

  backwards.CLIENT_SIDE = typeof document !== "undefined" && document !== null;


  /**
  The __SERVER_SIDE__ property is a boolean indicating if the current environment is server-side (f.ex. Node.js) or not. 
  
  @property SERVER_SIDE
  @type Boolean
  @final
  @public
   */

  backwards.SERVER_SIDE = !backwards.CLIENT_SIDE;


  /**
  This function is an internal function that is used by 'curry' to create curried functions from functions that take more than one parameter. 
  
  @method __curry
  @private
  @param f {Function} The function to be curried. 
  @param args* {"any"} Arguments that should be applied to the resulting function. 
  @return {Function} A curried function.
   */

  __curry = function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return function() {
      var params;
      params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return f.apply(this, args.concat(params));
    };
  };


  /**
  Create a curried function from a function that normally takes multiple parameters. 
  
  @method curry
  @public
  @param f {Function} The function to be curried. 
  @param [length] {Number} An optional parameter defining how many parameters the given function has. 
  @return {Function} A curried function. 
  @example
      function concat ( a, b ) {
        return a.concat( b );
      }
  
      var curriedConcat  = curry( concat )          // A curried function
        , oneAndTwo      = curriedConcat( [1, 2] )  // A curried function
        , oneTwoAndThree = oneAndTwo( [3] )         // [1, 2, 3]
        , oneTwoAndFour  = oneAndTwo( [4] )         // [1, 2, 4]
      ;
   */

  curry = function(f, length) {
    var newFunction;
    if (length == null) {
      length = f.length;
    }
    newFunction = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length < length) {
        return curry(__curry.apply(this, [f].concat(args)), length - args.length);
      } else {
        return f.apply(this, args);
      }
    };
    newFunction.toString = function() {
      return f.toString();
    };
    newFunction.curried = true;
    return newFunction;
  };

  backwards.curry = curry;


  /**
   * Compose your functions into a single function. 
   * @memberOf backwards
   * @param  {...function} fs Two or more functions to compose. 
   * @return {function}       The resulting function. 
   * @example
      function addOne ( x ) {
        return x + 1;
      }
  
      function timesTwo ( x ) {
        return x * 2;
      }
  
      var nine = compose( addOne, timesTwo )( 4 )   // 9
        , ten  = compose( timesTwo, addOne )( 4 )   // 10
      ;
   */

  compose = function() {
    var fs;
    fs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return function() {
      var args, i;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      i = fs.length;
      while (i--) {
        args = [fs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  backwards.compose = compose;


  /**
  Check if an Object is of a particular type. 
  
  @method isTypeOf
  @public
  @param type {String} The String representation of the Object. 
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value representing whether x is a type. 
  @example
      var isBoolean = isTypeOf( 'Boolean' ) // A composed function
        , passed    = isBoolean( true )     // true
        , failed    = isBoolean( {} )       // false
      ;
   */

  isTypeOf = curry(function(type, x) {
    var str;
    str = "[object " + type + "]";
    return toString.call(x) === str;
  });

  backwards.isTypeOf = isTypeOf;


  /**
  Check if an object is a DOM element. 
  
  @method isElement
  @public
  @param x {"any"} The object you wish to check the type of. 
  @return {Boolean} A boolean value. 
  @example
      isElement( document.createElement("div") );   // true
      isElement( {} );                              // false
      isElement( false );                           // false
   */

  isElement = function(x) {
    return !!(x && x.nodeType === 1);
  };

  backwards.isElement = isElement;


  /**
  Check if an Object is an Arguments object. 
  
  @method isArguments
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isArguments( arguments )  // true
        , failed = isArguments( false )      // false
      ;
   */

  isArguments = (function() {
    if (isTypeOf("Arguments", arguments)) {
      return isTypeOf("Arguments");
    } else {
      return function(x) {
        return (x != null) && hasOwn.call(x, "callee");
      };
    }
  })();

  backwards.isArguments = isArguments;


  /**
  Check if an Object is an Array. 
  
  @method isArray
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isArray( [1, 2, 3] )  // true
        , failed = isArray( false )      // false
      ;
   */

  isArray = Array.isArray || isTypeOf("Array");

  backwards.isArray = isArray;


  /**
  Check if an Object is a Boolean. 
  
  @method isBoolean
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isBoolean( true )  // true
        , passes = isBoolean( false ) // true
        , failed = isBoolean( 0 )     // false
      ;
   */

  isBoolean = function(x) {
    return x === true || x === false || isTypeOf("Boolean", x);
  };

  backwards.isBoolean = isBoolean;


  /**
  Check if an Object is a Date. 
  
  @method isDate
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isDate( new Date() )   // true
        , failed = isDate( +new Date() )  // false
        , fails  = isDate( false )        // false
      ;
   */

  isDate = isTypeOf("Date");

  backwards.isDate = isDate;


  /**
  Check if an Object is an Error. 
  
  @method isError
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isError( new Error() )       // true
        , passes = isError( new TypeError() )   // true
        , failed = isError( false )             // false
      ;
   */

  isError = isTypeOf("Error");

  backwards.isError = isError;


  /**
  Check if an Object is a finite number. 
  
  @method isFinite
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      isFinite( 1234 );           // true
      isFinite( NaN );            // true
      isFinite( new Number() );   // true
      isFinite( +new Date() );    // true
      isFinite( Infinity );       // false
   */

  isFinite = Number.isFinite || function(x) {
    return isNumber(x) && !isNaN(x) && x !== Infinity && x > 0;
  };

  backwards.isFinite = isFinite;


  /**
  Check if an Object is a Function. 
  
  @method isFunction
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var noop   = function () {}
        , passed = isFunction( noop )             // true
        , passes = isFunction( new Function() )   // true
        , failed = isFunction( false )            // false
      ;
   */

  isFunction = (function() {
    if (typeof /./ !== "function") {
      return function(x) {
        return typeof x === "function";
      };
    } else {
      return isTypeOf("Function");
    }
  })();

  backwards.isFunction = isFunction;


  /**
  Check if an Object is a NaN object. 
  
  @method isNaN
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isNaN( NaN )           // true
        , passes = isNaN( new Number() )  // false
        , failed = isNaN( false )         // false
      ;
   */

  backwards.isNaN = Number.isNaN || function(x) {
    return typeof x === "number" && isNaN(x);
  };


  /**
  Check if an Object is a Null object. 
  
  @method isNull
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isNull( null )    // true
        , failed = isNull( false )   // false
      ;
   */

  isNull = function(x) {
    return x === null || isTypeOf("Null", x);
  };

  backwards.isNull = isNull;


  /**
  Check if an Object is a Number. 
  
  @method isNumber
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isNumber( 123 )     // true
        , failed = isNumber( false )   // false
      ;
   */

  isNumber = isTypeOf("Number");

  backwards.isNumber = isNumber;


  /**
  Check if an Object is an Object. 
  
  @method isObject
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isObject( {} )      // true
        , failed = isObject( false )   // false
      ;
   */

  isObject = function(x) {
    if ((x == null) || isArguments(x) || isElement(x) || isFunction(x.then)) {
      return false;
    } else {
      return isTypeOf("Object", x);
    }
  };

  backwards.isObject = isObject;


  /**
  Check if an Object is a Promise. 
  
  @method isPromise
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var promise = new Promise(function (resolve, reject) {
        resolve( "I am a promise" );
      });
  
      isPromise( promise );   // true
      isPromise( {} );        // false
   */

  isPromise = function(x) {
    if (isTypeOf("Promise", x)) {
      return true;
    }
    if (x != null) {
      if (typeof x.then === "function") {
        return true;
      }
    }
    return false;
  };

  backwards.isPromise = isPromise;


  /**
  Check if an Object is a regular expression ( RegExp ). 
  
  @method isRegExp
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isRegExp( /./ )            // true
        , passes = isRegExp( new RegExp() )   // true
        , failed = isRegExp( false )          // false
      ;
   */

  isRegExp = isTypeOf("RegExp");

  backwards.isRegExp = isRegExp;


  /**
  Check if an Object is a String. 
  
  @method isString
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isString( "string" )  // true
        , failed = isString( false )     // false
      ;
   */

  isString = isTypeOf("String");

  backwards.isString = isString;


  /**
  Check if an Object is undefined. 
  
  @method isUndefined
  @public
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @example
      var passed = isUndefined( void 0 )   // true
        , failed = isUndefined( false )    // false
      ;
   */

  isUndefined = function(x) {
    return x === void 0 || isTypeOf("Undefined", x);
  };

  backwards.isUndefined = isUndefined;

  exists = function(x) {
    return x != null;
  };

  backwards.exists = exists;

  isEmpty = function(x) {
    var key;
    if (isObject(x)) {
      for (key in x) {
        if (!__hasProp.call(x, key)) continue;
        return false;
      }
    } else if (isArray(x)) {
      if (x.length) {
        return false;
      }
    }
    return true;
  };

  backwards.isEmpty = isEmpty;


  /**
  forEach executes the provided callback once for each element present in the array in ascending order. It is not invoked for indexes that have been deleted or elided. However, it is executed for elements that are present and have the value undefined.
  
  callback is invoked with three arguments:
  
      the element value
      the element index, key or undefined
      the array or object being traversed or undefined
  
  The range of elements processed by forEach is set before the first invocation of callback. Elements that are appended to the array after the call to forEach begins will not be visited by callback. If the values of existing elements of the array are changed, the value passed to callback will be the value at the time forEach visits them; elements that are deleted before being visited are not visited.
  
  @method forEach
  @public
  @param f {Function} The function you wish to execute over each element in the object. 
  @param f.value {"any"} The element value. 
  @param f.key {Number|String|undefined} The element index, key or undefined. 
  @param f.object {Array|Object|undefined} The array or object being traversed or undefined. 
  @param x {"any"} The object you wish to iterate over. 
  @return {undefined}
  @example
      var f = function (value, key, object) {
        console.log( value, key );
      };
  
      forEach( f, [1, 2, 3] );                  // undefined
      forEach( f, { id: 1, name: "string" } );  // undefined
      forEach( f, "Hello folks!" );             // undefined
   */

  forEach = function(f, xs) {
    var key, value, _i, _len;
    if (xs.length || isArray(xs)) {
      for (key = _i = 0, _len = xs.length; _i < _len; key = ++_i) {
        value = xs[key];
        f(value, key, xs);
      }
    } else if (isObject(xs)) {
      for (key in xs) {
        value = xs[key];
        if (hasOwn.call(xs, key)) {
          f(value, key, xs);
        }
      }
    } else {
      f(xs);
    }
  };

  backwards.forEach = curry(forEach);


  /**
  The __map__ function calls the provided callback function (f) once for each element in an array, in ascending order, and constructs a new array from the results. __callback__ is invoked only for indexes of the array which have assigned values; it is not invoked for indexes that are undefined, those which have been deleted or which have never been assigned values.
  
  callback is invoked with three arguments:
  
      the element value
      the element index, key or undefined
      the array or object being traversed or undefined
  
  The __map__ function does not mutate the array on which it is called (although callback, if invoked, may do so).
  
  The range of elements processed by map is set before the first invocation of callback. Elements which are appended to the array after the call to map begins will not be visited by callback. If existing elements of the array are changed, or deleted, their value as passed to callback will be the value at the time map visits them; elements that are deleted are not visited.
  
  @method map
  @public
  @param f {Function} The function you wish to execute over each element in the object. 
  @param f.value {"any"} The element value. 
  @param f.key {Number|String|undefined} The element index, key or undefined. 
  @param f.object {Array|Object|undefined} The array or object being traversed or undefined. 
  @param xs {"any"} The object you wish to iterate over. 
  @return {"any"}
  @example
      var addOne = function (x) {
        return x + 1;
      };
  
      map( addOne, [1, 2, 3] );                  // [2, 3, 4]
      map( addOne, { id: 1, name: "string" } );  // ["id1", "name1"]
      map( addOne, "Hello folks!" );             // "Hello folks!1"
   */

  map = function(f, xs) {
    var acc;
    if (isArray(xs) || isObject(xs)) {
      acc = [];
      forEach(function(value, index, object) {
        if (value != null) {
          acc.push(f(value, index, object));
        } else {
          acc.push(void 0);
        }
      }, xs);
      return acc;
    } else if (xs != null) {
      if (isFunction(xs.map)) {
        return xs.map(f);
      } else if (isPromise(xs)) {
        return xs.then(f);
      } else {
        return f(xs);
      }
    } else {
      return xs;
    }
  };

  backwards.map = curry(map);

  filter = function(f, xs) {
    var acc;
    if (isArray(xs)) {
      acc = [];
      map(function(value, index, array) {
        if (f(value, index, array)) {
          return acc.push(value);
        }
      }, xs);
      return acc;
    } else {
      if (f(xs)) {
        return xs;
      }
    }
  };

  backwards.filter = curry(filter);

  keys = function(x) {
    var acc;
    acc = [];
    forEach(function(value, key, object) {
      return acc.push(key);
    }, x);
    return acc;
  };


  /**
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
   */

  reduce = function(f, acc, x) {
    if ((acc == null) && isEmpty(x)) {
      throw new TypeError("Reduce of empty object with no initial value");
    }
    if (isArray(x) || isObject(x)) {
      forEach(function(value, key, object) {
        if (acc === void 0) {
          acc = value;
        } else {
          acc = f(acc, value, key, object);
        }
      }, x);
    } else {
      acc = f(acc, x);
    }
    return acc;
  };

  backwards.reduce = curry(reduce);

  max = backwards.reduce(function(max, num) {
    if (max > num) {
      return max;
    } else {
      return num;
    }
  }, void 0);

  min = backwards.reduce(function(min, num) {
    if (min < num) {
      return min;
    } else {
      return num;
    }
  }, void 0);


  /**
  The __extend__ function takes two or more objects and returns the first object (__acc__) extended with the properties (and values) of the other objects in ascending order. 
  
  @method extend
  @public
  @param acc {Object} The object you wish to extend. 
  @param objects* {Object} The objects you wish to be extended to __acc__. 
  @return {Object} Returns the first object (__acc__) extended with the other objects properties and values in ascending order. 
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
   */

  extend = function() {
    var acc, objects;
    objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    acc = {};
    forEach(function(object) {
      return forEach(function(value, key) {
        acc[key] = value;
      }, object);
    }, objects);
    return acc;
  };

  backwards.extend = curry(extend);


  /**
  The __copy__ function takes an Object and returns a fresh copy of 
  the Object. 
  
  @method copy
  @public
  @param x {"any"} The Object you wish to copy. 
  @return {"any"} A fresh copy of the given Object. 
  @example
      copy( [1, 2, 3] );                  // [1, 2, 3]
      copy( { id: 1, name: "string" } );  // { id: 1, name: "string" }
   */

  copy = function(x) {
    if (isObject(x)) {
      return extend(x);
    } else {
      return map(I, x);
    }
  };

  backwards.copy = copy;


  /**
  The __flatten__ function takes an array of arrays and flattens 
  the array one level. 
  
  @method flatten
  @public
  @param x {Array} The Array you wish to flatten. 
  @return {Array} A flattened Array. 
  @example
      var array = [[1, 2], [3, 4], [5, 6]];
  
      flatten( array ); // [1, 2, 3, 4, 5, 6]
   */

  flatten = backwards.reduce(concat, []);

  backwards.flatten = flatten;


  /**
  The __indexOf__ function returns the first index at which a given element can be found, or -1 if it could not be found.
  
  If the index (__i__) is greater than or equal to the array or string length, -1 is returned, which means the array will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the array or string. Note: if the provided index is negative, the array is still searched from front to back. If the calculated index is less than 0, then the whole array will be searched. 
  
  If __x__ is a string, __i__ is greater than or equal to __x__.length and __search__ is an empty string ("") then __x__.length is returned. 
  
  @method indexOf
  @public
  @param search {"mixed"} The element to locate in the array.
  @param i {Number} The index to start the search at. 
  @param x {Array|String} The array or string you wish to search. 
  @return {Number} The first index at which a given element can be found, or -1 if not found. 
  @example
      var array = [2, 5, 9];
  
      indexOf( 2,  0, array );  //  0
      indexOf( 7,  0, array );  // -1
      indexOf( 9,  2, array );  //  2
      indexOf( 2, -1, array );  // -1
      indexOf( 2, -3, array );  //  0
   */

  indexOf = function(search, i, x) {
    var isNaN, len;
    len = x.length;
    i = i || 0;
    isNaN = backwards.isNaN;
    if (len === 0 || i >= len) {
      if (search === "" && isString(x)) {
        return len;
      } else {
        return -1;
      }
    } else if (i < 0) {
      i = len + i;
      if (i < 0) {
        i = 0;
      }
    }
    if (isArray(x)) {
      while (i < len) {
        if (x[i] === search || isNaN(search) && isNaN(x[i])) {
          return i;
        }
        i++;
      }
    } else if (isString(x)) {
      return x.indexOf(search, i);
    }
    return -1;
  };

  backwards.indexOf = curry(indexOf);


  /**
  The __contains__ function returns true if a given element can be found in the array, or false if it is not present.
  
  If the index is greater than or equal to the array's length, false is returned, which means the array will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the array. Note: if the provided index is negative, the array is still searched from front to back. If the calculated index is less than 0, then the whole array will be searched. 
  
  @method contains
  @public
  @param search {"mixed"} The element to locate in the array.
  @param i {Number} The index to start the search at. 
  @param x {Array|String} The Array you wish to search in. 
  @return {Boolean} Returns true if *search* is found in the *Array*, or false if it is not found. 
  @example
      var array = [1, 2, 3, NaN];
  
      contains( 2,   0, array );  // true
      contains( 4,   0, array );  // false
      contains( 3,   3, array );  // false
      contains( 3,  -2, array );  // true
      contains( NaN, 0, array );  // true
   */

  contains = function(search, i, x) {
    return (indexOf(search, i, x)) !== -1;
  };

  backwards.contains = curry(contains);


  /**
  The __some__ function takes a predicate function and an array and returns true if some of the values in the array conforms with the predicate function, or false if not. It returns false if given an empty array. 
  
  @method some
  @public
  @param f {Function} A predicate function. 
  @param xs {Array} The array you wish to check. 
  @return {Boolean} Returns true if some of the values in the array conforms with the predicate function, or false if not. It returns false if given an empty array. 
  @example
      var predicate = function (x) { return x > 10 };
  
      some( predicate, [12, 5, 8, 1, 4] );  // true
      some( predicate, [2, 5, 8, 1, 4] );   // false
      some( predicate, [] );                // false
   */

  some = function(f, xs) {
    var x, _i, _len;
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (f(x)) {
        return true;
      }
    }
    return false;
  };

  backwards.some = curry(some);


  /**
  The __every__ function takes a predicate function and an array and returns true if every value in the array conforms with the predicate function, or false if not. It returns true if given an empty array. 
  
  @method every
  @public
  @param f {Function} A predicate function. 
  @param xs {Array} The array you wish to check. 
  @return {Boolean} Returns true if every value in the array conforms with the predicate function, or false if not. It returns true if given an empty array. 
  @example
      var predicate = function (x) { return x > 10 };
  
      every( predicate, [] );                     // true
      every( predicate, [12, 54, 18, 130, 44] );  // true
      every( predicate, [12, 5, 8, 130, 44] );    // false
   */

  every = function(f, xs) {
    var x, _i, _len;
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (!f(x)) {
        return false;
      }
    }
    return true;
  };

  backwards.every = curry(every);


  /**
  The __delete__ function takes an element and an array or string, and deletes the first occurence of that element from the list. It returns a new array or string. 
  
  @method delete
  @public
  @param x {"any"} The element to delete. 
  @param xs {Array|String} The array or string you wish to delete an element from. 
  @return {Array|String} Returns an array or string without causing side-effects on the given array or string. 
  @example
      delete( 12        , [12, 54, 18, NaN, "element"] );   // [54,18,NaN,"element"]
      delete( NaN       , [12, 54, 18, NaN, "element"] );   // [12,54,18,"element"]
      delete( "element" , [12, 54, 18, NaN, "element"] );   // [12,54,18,NaN]
      delete( 1234      , [12, 54, 18, NaN, "element"] );   // [12,54,18,NaN,"element"]
      delete( "e"       , "element" );                      // "lement"
      delete( "ele"     , "element" );                      // "ment"
   */

  _delete = function(x, xs) {
    var i, n;
    i = indexOf(x, 0, xs);
    n = x.length || 1;
    if (i !== -1 && xs.length) {
      return xs.slice(0, i).concat(xs.slice(i + n, xs.length));
    } else {
      return xs;
    }
  };

  backwards["delete"] = curry(_delete);


  /**
  The __partition__ function takes a predicate function and an array or a string, and returns an array with two indexes. The first index in the resulting array contains all the elements that conforms to the predicate function, and the second index contains all the elements that does not. 
  
  @method partition
  @public
  @param f {Function} The predicate function. 
  @param xs {Array|String} The array or string you wish to partition. 
  @return {Array} Returns an array with two indexes. The first index contains all the elements that conforms to the predicate function, and the second index contains all the elements that does not. 
  @example
      var partition = backwards.partition
        , indexOf   = backwards.indexOf
        , array     = [12, 54, 18, NaN, "element"]
        , string    = "elementary eh!"
        , predicateArray, predicateString;
  
      predicateArray  = function (x) {
        return x > 15;
      };
  
      predicateString = function (x) {
        return indexOf( x, 0, "element" );
      };
  
      partition( predicateArray, array );
      // [[54, 18], [12, NaN, "element"]]
      
      partition( predicateString, string );
      // [
      //   ["e","l","e","m","e","n","t","e"], 
      //   ["a","r","y"," ","h","!"]
      // ]
   */

  partition = function(f, xs) {
    var acc;
    acc = [[], []];
    if (isString(xs)) {
      xs = toArray(xs);
    }
    forEach(function(x, i, xs) {
      if (f(x, i, xs)) {
        acc[0].push(x);
      } else {
        acc[1].push(x);
      }
    }, xs);
    return acc;
  };

  backwards.partition = curry(partition);

  toArray = function(xs) {
    var result;
    if (isFunction(xs.charAt)) {
      result = [];
      forEach(function(value, index, string) {
        return result.push(string.charAt(index));
      }, xs);
    } else {
      result = copy(xs);
    }
    return result;
  };

  escape = function(html) {
    var result;
    result = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    if (result === ("" + html)) {
      return html;
    } else {
      return result;
    }
  };

  unescape = function(html) {
    var result;
    result = html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    if (result === ("" + html)) {
      return html;
    } else {
      return result;
    }
  };

  either = function(a, b) {
    return b != null ? b : a;
  };

  backwards.either = curry(either);

  maybe = function(f, x) {
    if (x != null) {
      return f(x);
    } else {
      return void 0;
    }
  };

  backwards.maybe = curry(maybe);


  /**
  The __pick__ function returns a subset of the given object. If given a positive number and an array or string it will return the first __i__ indexes of the object. If given a negative number and an array or string it will return the last __i__ indexes of the object. 
  
  If given an array of strings and an object it will return an object containing the keys / properties that was listed in __i__. 
  
  @method pick
  @public
  @param i {Number|Array} The number of indexes you wish to extract, or an array of strings which represents the keys of the object you wish to extract. 
  @param x {Array|String|Object} An array, string or object
  @return {Array|String|Object} A subset of the object. 
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
  
      pick(  3, array );          // [1, 2, 3]
      pick( -2, array );          // [4, 5]
      pick(  5, string );         // "Hello"
      pick( -6, string );         // "World!"
      pick( ['name'], object );   // { name: "John Doe" }
   */

  first = function(i, x) {
    return x.slice(0, i);
  };

  last = function(i, x) {
    return x.slice(i, x.length);
  };

  pick = function(i, x) {
    var acc, value;
    if (isNumber(i)) {
      if (i > 0) {
        return first(i, x);
      } else {
        return last(i, x);
      }
    } else {
      acc = {};
      value = void 0;
      forEach(function(key) {
        value = x[key];
        if (value) {
          acc[key] = value;
        }
      }, i);
      return acc;
    }
  };

  backwards.pick = curry(pick);


  /**
  Drops a subset of the given object, from the beginning to *i*, and returns the rest of the object. 
  
  @method omit
  @public
  @param i {Number|Array} The number of indexes you wish to extract
  @param x {Array|String|Object} An Array, String or Object
  @return {Array|String|Object} A subset of *x* from index *i* to the end
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
  
      omit(  3, array );                        // [4, 5]
      omit( -2, array );                        // [1, 2, 3]
      omit(  6, string );                       // "World!"
      omit( -7, string );                       // "Hello"
      omit( ['id', 'age', 'gender'], object );  // { name: "John Doe" }
   */

  omit = function(i, x) {
    var acc;
    if (isNumber(i)) {
      if (i > 0) {
        return last(i, x);
      } else {
        return first(i, x);
      }
    } else {
      acc = {};
      forEach(function(value, key) {
        if (!contains(key, 0, i)) {
          acc[key] = value;
        }
      }, x);
      return acc;
    }
  };

  backwards.omit = curry(omit);

  backwards.log = function(x) {
    var e;
    try {
      console.log(x);
    } catch (_error) {
      e = _error;
      alert(x);
    }
    return x;
  };

  pluck = function(key, xs) {
    return xs[key];
  };

  backwards.pluck = curry(pluck);

  split = curry(function(regexp, string) {
    return string.split(regexp);
  });

  join = curry(function(regexp, array) {
    return array.join(regexp);
  });

  lines = split(/\r\n|\r|\n/);

  unlines = join("\n");


  /**
  A monad that may or may not contain a value. The Maybe monad implements the map interface. 
  
  @class Maybe
  @memberof backwards
  @constructor
  @public
  @example
      var monad = new Maybe( 1234 );  // Maybe( 1234 )
      monad instanceof Maybe          // true
   */

  if ((typeof define !== "undefined" && define !== null) && define.amd) {
    define("backwards", [], function() {
      return backwards;
    });
  } else if (typeof exports !== "undefined" && exports !== null) {
    if ((typeof module !== "undefined" && module !== null) && module.exports) {
      module.exports = backwards;
    } else {
      exports.backwards = backwards;
    }
  } else if (typeof window !== "undefined" && window !== null) {
    window.backwards = backwards;
  } else {
    throw new Error("backwards.js could not be exported. ");
  }


  /*
  
  IDEAS, NOTES & BACKLOG
  ======================
  
  BACKLOG
  
  IDEAS
    * Make the backwards object itself a function that can be invoked in the following ways: 
      
      Debug mode: 
      Pass a string which represents the method you would like returned. This will return the method wrapped in a "try, catch" which will return valuable information when debugging ( an error message containing an url to where you can find more information about how to use the method ). 
  
      Extended with prototype: 
      Pass in any kind of object to get back the object extended with a backwards-prototype. Like for example: 
        backwards( [0, 1, 2, 3] ).map( (x) -> x + 1 )   // [1, 2, 3, 4]
  
      NOTES: 
      Make sure that the prototype way of invocation should work on strings as well, meaning that invocation with a string that does not represent a method on the backwards object should return the string extended with the backwards prototype.
   */

}).call(this);
