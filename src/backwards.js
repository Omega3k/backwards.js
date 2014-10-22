/* global module */

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

   * Test Results: 
      - Linux, Chrome - Promise is not defined

   * Make special-methods for: 
      - hasNativeMethod(x.map, function(){}) If the native method exists then return x.map(f), else return polyfill(f, x)
      - either
      - maybe
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
  
  var module      = {}
    , arrayProto  = Array.prototype
    , objectProto = Object.prototype
    , slice       = arrayProto.slice
    , toString    = objectProto.toString
    
    , curry, autoCurry, compose
    , isTypeOf, isArguments, isArray, isBoolean, isDate, isFunction, isNaN, isNumber, isObject, isPromise, isRegExp, isString, isNull, isUndefined
    , toArray
    , objectMap, arrayMap, promiseMap, map
  ;
  
  //+ curry :: Function -> Function
  curry = function (f) {
    var args = slice.call(arguments, 1); 
    return function () {
      return f.apply(this, args.concat(slice.call(arguments, 0))); 
    }; 
  }; 

  //+ autoCurry :: Function -> Number -> Function
  autoCurry = module.autoCurry = function (f, length) { 
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
  }; 
  
  Function.prototype.autoCurry = function(n) {
    return autoCurry(this, n);
  };

  //+ compose :: Function, ... -> Function
  compose = module.compose = function () {
    var fs = arguments;
    return function () {
      var args = arguments
        , i    = fs.length;

      while (i--) {
        args = [fs[i].apply(this, args)];
      }
      return args[0];
    };
  };
  
  //+ isTypeOf :: String -> a -> Boolean
  isTypeOf = module.isTypeOf = function (type, x) { 
    return toString.call(x) === '[object ' + type + ']'; 
  }.autoCurry();
  
  //+ isArguments :: a -> Boolean
  isArguments = module.isArguments = (function () {
    if (isTypeOf('Arguments', arguments)) {
      return isTypeOf('Arguments');
    } else {
      return function (x) {
        return x !== null && x !== void 0 && x.hasOwnProperty('callee');
      };
    }
  }()); 
  
  //+ isArray :: a -> Boolean
  isArray = module.isArray = Array.isArray || isTypeOf('Array');
  
  //+ isBoolean :: a -> Boolean
  isBoolean = module.isBoolean = function (x) {
    return x === true || x === false;
  };
  
  //+ isDate :: a -> Boolean
  isDate = module.isDate = isTypeOf('Date');
  
  //+ isFinite :: a -> Boolean
  isFinite = module.isFinite = function (x) {
    return isFinite(x) && !isNaN(parseFloat(x));
  };
  
  //+ isFunction :: a -> Boolean
  isFunction = module.isFunction = (function () {
    if (typeof /./ !== 'function') {
      return function (x) {
        return typeof x === 'function';
      };
    } else {
      return isTypeOf('Function');
    }
  }());
  
  //+ isNaN :: a -> Boolean
  isNaN = module.isNaN = function (x) {
    return isNumber(x) && x !== +x;
  };
  
  //+ isNull :: a -> Boolean
  isNull = module.isNull = function (x) {
    return x === null || isTypeOf('Null', x);
  };
  
  //+ isNumber :: a -> Boolean
  isNumber = module.isNumber = isTypeOf('Number');
  
  //+ isObject :: a -> Boolean
  isObject = module.isObject = function (x) {
    if (x === null || x === void 0 || isArguments(x)) {
      return false;
    } else {
      return isTypeOf('Object', x);
    }
  };

  // isObject = module.isObject = function (x) {
  //   return typeof x === 'function' || typeof x === 'object' && !!x;
  // };
  
  //+ isPromise :: a -> Boolean
  isPromise = module.isPromise = isTypeOf('Promise');
  
  //+ isRegExp :: a -> Boolean
  isRegExp = module.isRegExp = isTypeOf('RegExp');
  
  //+ isString :: a -> Boolean
  isString = module.isString = isTypeOf('String');
  
  //+ isUndefined :: a -> Boolean
  isUndefined = module.isUndefined = function (x) {
    return x === void 0 || isTypeOf('Undefined', x);
  };

  //+ exists :: a -> Boolean
  module.exists = function (x) {
    return x !== null && x !== void 0;
  };
  
  //+ toArray :: a -> [b]
  toArray = function(x) {
    return slice.call(x);
  };

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
    if ( isArray(x) || isArguments(x) || isObject(x) ) {
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
  function filter (f, x) {
    return reduce(function (acc, val, i, arr) {
      if ( f(val, i, arr) ) {
        acc.push(val);
      }
      return acc;
    }, [], x);
  }

  module.filter = autoCurry(filter);

  function indexOf (search, i, x) {
    var len;

    // if (x.indexOf) {
    //   return x.indexOf(search, i);
    // }

      len = x.length;

      if (len === 0 || i >= len) {
        return -1;
      } else if (i < 0) {
        console.log('Modified variable BEFORE: ' + i);
        i = len + i;
        console.log('Modified variable AFTER: ' + i);
      }

      while(len > i){
        if (i in x && x[i] === search) {
          return i;
        }
        i++;
      }

      return -1;
  }

  module.indexOf = autoCurry(indexOf);
  
  module.either = function (x, y) {
    return y ? y : x;
  }.autoCurry();

  // module.either = function (x, y) {
  //   if (y && y !== null && y !== undefined && y !== '') {
  //     return y;
  //   } else {
  //     return x;
  //   }
  // }.autoCurry();

  module.trampoline = function (f) {
    var result = f;
    while (result instanceof Function) {
      result = result();
    }
    return result;
  };
  
  //+ pluck :: String|Number -> a -> a
  module.pluck = function (prop, x) {
    return x[prop];
  }.autoCurry();
  
  module.push = function (val, x) {
    x.push(val);
  }.autoCurry();
  
  //+ replace :: String -> String -> String -> String
  module.replace = function (s1, s2, s) {
    return s.replace(s1, s2);
  }.autoCurry();
  
  //+ split :: String -> String -> Array
  module.split = function (s1, s) {
    return s.split(s1);
  }.autoCurry();
  
  //+ join :: String -> String -> String
  module.join = function (s1, s2) {
    return s1.concat(s2);
  }.autoCurry();
  
  //+ log :: a -> undefined
  module.log = function (x) {
    console.log('Logging: ', x);
  }.autoCurry();
  
  return module;
}));