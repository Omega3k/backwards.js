(function() {
  "use strict";

  /**
  A set of utility functions for functional programming in Javascript.
  
  @module backwards
  @main backwards
  @class backwards
  @static
   */
  var add, append, array, arrayFilter, arrayMap, arrayProto, arrayReduce, autoCurry, backwards, compose, console, contains, copy, curry, drop, either, every, exists, filter, filterOne, flatten, forEach, identity, indexOf, isArguments, isArray, isBoolean, isDate, isEmpty, isError, isFinite, isFunction, isNaN, isNull, isNumber, isObject, isPromise, isRegExp, isString, isTypeOf, isUndefined, map, maybe, noop, object, objectMap, objectProto, objectReduce, reduce, slice, some, take, toString,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  backwards = {};

  array = Array;

  arrayProto = array.prototype;

  slice = arrayProto.slice;

  object = Object;

  objectProto = object.prototype;

  toString = objectProto.toString;

  noop = function() {};

  identity = function(x) {
    return x;
  };

  add = function(a, b) {
    return a + b;
  };

  append = function(a, b) {
    if (a.concat) {
      return a.concat(b);
    } else {
      return a += b;
    }
  };


  /**
  This function is an internal function that is used by 'autoCurry' to create curried functions from functions that take more than one parameter. 
  
  @method curry
  @param f {Function} The function to be curried. 
  @return {Function} A curried function. 
  @private
   */

  curry = function() {
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

  autoCurry = function(f, length) {
    var newFunction;
    if (length == null) {
      length = f.length;
    }
    newFunction = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length < length) {
        return autoCurry(curry.apply(this, [f].concat(args)), length - args.length);
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

  backwards.autoCurry = autoCurry;


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
  @param type {String} The String representation of the Object. 
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value representing whether x is a type. 
  @public
  @example
      var isBoolean = isTypeOf( 'Boolean' ) // A composed function
        , passed    = isBoolean( true )     // true
        , failed    = isBoolean( {} )       // false
      ;
   */

  isTypeOf = autoCurry(function(type, x) {
    var str;
    str = "[object " + type + "]";
    return toString.call(x) === str;
  });

  backwards.isTypeOf = isTypeOf;


  /**
  Check if an Object is an Arguments object. 
  
  @method isArguments
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
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
        return (x != null) && x.hasOwnProperty("callee");
      };
    }
  })();

  backwards.isArguments = isArguments;


  /**
  Check if an Object is an Array. 
  
  @method isArray
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
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
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isBoolean( true )  // true
        , failed = isBoolean( 0 )     // false
      ;
   */

  isBoolean = function(x) {
    return x === true || x === false || isTypeOf("Boolean", x);
  };

  backwards.isBoolean = isBoolean;

  isDate = isTypeOf("Date");

  backwards.isDate = isDate;

  isError = isTypeOf("Error" || isTypeOf("TypeError"));

  backwards.isError = isError;

  isFinite = function(x) {
    return isFinite(x) && !isNaN(parseFloat(x));
  };

  backwards.isFinite = isFinite;


  /**
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

  isNaN = isNaN || function(x) {
    return isNumber(x) && x !== +x;
  };

  backwards.isNaN = isNaN;


  /**
  Check if an Object is a Null object. 
  
  @method isNull
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
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
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
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
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isObject( {} )      // true
        , failed = isObject( false )   // false
      ;
   */

  isObject = function(x) {
    if ((x == null) || isArguments(x)) {
      return false;
    } else {
      return isTypeOf("Object", x);
    }
  };

  backwards.isObject = isObject;

  isPromise = isTypeOf("Promise");

  backwards.isPromise = isPromise;

  isRegExp = isTypeOf("RegExp");

  backwards.isRegExp = isRegExp;


  /**
  Check if an Object is a String. 
  
  @method isString
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
  @example
      var passed = isString( 'string' )  // true
        , failed = isString( false )     // false
      ;
   */

  isString = isTypeOf("String");

  backwards.isString = isString;


  /**
  Check if an Object is undefined. 
  
  @method isUndefined
  @param x {"any"} The Object you wish to check the type of. 
  @return {Boolean} A Boolean value. 
  @public
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

  arrayReduce = function(f, acc, xs) {
    var i, val, _i, _len;
    for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
      val = xs[i];
      acc = f(acc, val, i, xs);
    }
    return acc;
  };

  objectReduce = function(f, acc, x) {
    var i, val;
    for (val in x) {
      if (!__hasProp.call(x, val)) continue;
      i = x[val];
      acc = f(acc, val, i, x);
    }
    return acc;
  };

  reduce = function(f, acc, x) {
    if (isArray(x)) {
      return arrayReduce(f, acc, x);
    } else if (isObject(x)) {
      return objectReduce(f, acc, x);
    } else {
      acc = f(x);
      return acc;
    }
  };

  backwards.reduce = autoCurry(reduce);

  forEach = function(f, xs) {
    reduce((function(acc, x, i, xs) {
      return f(x, i, xs);
    }), xs, xs);
    return void 0;
  };

  backwards.forEach = autoCurry(forEach);

  arrayFilter = function(f, xs) {
    var x, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      if (f(x)) {
        _results.push(x);
      }
    }
    return _results;
  };

  filterOne = function(f, x) {
    if (f(x)) {
      return x;
    } else {
      return null;
    }
  };

  filter = function(f, x) {
    if (isArray(x)) {
      return arrayFilter(f, x);
    } else {
      return filterOne(f, x);
    }
  };

  backwards.filter = autoCurry(filter);

  arrayMap = function(f, xs) {
    var x, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = xs.length; _i < _len; _i++) {
      x = xs[_i];
      _results.push(f(x));
    }
    return _results;
  };

  objectMap = function(f, xs) {
    var acc, key, x;
    acc = {};
    for (key in xs) {
      if (!__hasProp.call(xs, key)) continue;
      x = xs[key];
      acc[key] = f(x);
    }
    return acc;
  };

  map = function(f, xs) {
    if (isArray(xs)) {
      return arrayMap(f, xs);
    } else if (isObject(xs)) {
      return objectMap(f, xs);
    } else {
      return f(xs);
    }
  };

  backwards.map = autoCurry(map);


  /**
  The copy function takes an Object and returns a fresh copy of 
  the Object. 
  
  @method copy
  @param x {"any"} The Object you wish to copy. 
  @return {"any"} A fresh copy of the given Object. 
  @public
  @example
      copy( [1, 2, 3] );                  // [1, 2, 3]
      copy( { id: 1, name: "string" } );  // { id: 1, name: "string" }
   */

  copy = backwards.map(identity);

  backwards.copy = copy;


  /**
  The flatten function takes an Array of Arrays and flattens 
  the Array one level. 
  
  @method flatten
  @param x {Array} The Array you wish to flatten. 
  @return {Array} A flattened Array. 
  @public
  @example
      var array = [[1, 2], [3, 4], [5, 6]];
  
      flatten( array ); // [1, 2, 3, 4, 5, 6]
   */

  flatten = backwards.reduce(append, []);

  backwards.flatten = flatten;


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
  
      indexOf( 2,  0, array );  //  0
      indexOf( 7,  0, array );  // -1
      indexOf( 9,  2, array );  //  2
      indexOf( 2, -1, array );  // -1
      indexOf( 2, -3, array );  //  0
   */

  indexOf = function(search, i, x) {
    var len;
    len = x.length;
    if (len === 0 || i >= len) {
      return -1;
    } else if (i < 0) {
      i = len + i;
      if (i < 0) {
        i = 0;
      }
    }
    while (i < len) {
      if (x[i] === search || isNaN(search) && isNaN(x[i])) {
        return i;
      }
      i++;
    }
    return -1;
  };

  backwards.indexOf = autoCurry(indexOf);


  /**
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
   */

  contains = function(search, i, x) {
    return (indexOf(search, i, x)) > -1;
  };

  backwards.contains = autoCurry(contains);


  /**
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

  backwards.some = autoCurry(some);


  /**
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

  backwards.every = autoCurry(every);

  either = function(a, b) {
    if (b) {
      return b;
    } else {
      return a;
    }
  };

  backwards.either = autoCurry(either);

  maybe = function(f, x) {
    if (x) {
      return f(x);
    } else {
      return void 0;
    }
  };

  backwards.maybe = autoCurry(maybe);


  /**
  Extracts a subset of the given object, from the beginning to *i*. 
  
  @method take
  @param i {Number} The number of indexes you wish to extract
  @param x {Array|String} An Array or a String
  @return {Array|String} A subset of *x* from the beginning to *i*
  @public
  @example
      var firstThree  = take( 3 )
        , oneTwoThree = firstThree( [1, 2, 3, 4, 5] ) // [1, 2, 3]
        , hello       = take( 5, 'Hello World!' )     // 'Hello'
      ;
   */

  take = function(i, x) {
    var error;
    try {
      return x.slice(0, i);
    } catch (_error) {
      error = _error;
      return error;
    }
  };

  backwards.take = autoCurry(take);


  /**
  Drops a subset of the given object, from the beginning to *i*, and returns the rest of the object. 
  
  @method drop
  @param i {Number} The number of indexes you wish to extract
  @param x {Array|String} An Array or a String
  @return {Array|String} A subset of *x* from index *i* to the end
  @public
  @example
      var firstThree = drop( 3 )
        , fourFive   = firstThree( [1, 2, 3, 4, 5] )  // [4, 5]
        , world      = drop( 6, 'Hello World!' )      // 'World!'
   */

  drop = function(i, x) {
    var error;
    try {
      return x.slice(i, x.length);
    } catch (_error) {
      error = _error;
      return error;
    }
  };

  backwards.drop = autoCurry(drop);

  console = console || {};

  forEach(function(method) {
    if (!console[method]) {
      console[method] = noop;
    }
    return void 0;
  }, ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"]);

  backwards.log = function(x) {
    console.log(x);
    return x;
  };

  (function(root, name, f) {
    if ((typeof define !== "undefined" && define !== null) && define.amd) {
      define(name, [], f);
    } else if (typeof exports !== "undefined" && exports !== null) {
      if ((typeof module !== "undefined" && module !== null) && module.exports) {
        module.exports = f();
      } else {
        exports[name] = f();
      }
    } else {
      root[name] = f();
    }
    return void 0;
  })(this, "backwards", function() {
    return backwards;
  });


  /* 
  
   * { error, success } = options
  
   * Game Loop
  while running
    now = Date.now()
    delta = now - lastTime
    buffer += delta
    while buffer >= TICK
      update TICK
      buffer -= TICK
    render()
    lastTime = now
  
   * map :: (a -> b) -> [a] -> [b]
  map = (f, [x, xs...]) ->
    if x is undefined
      []
    else
      [f(x), map(f, xs)...]
  
   * length :: [a] -> Int
  length = ([x, xs...]) ->
    if x is undefined
      0
    else
      1 + length xs
   */

}).call(this);

//# sourceMappingURL=backwards.dev.js.map
