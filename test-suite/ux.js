(function() {
  var $body, $failedtests, $message, $modal, $passedtests, $summary, add, addOne, append, assertionsTemplate, compose, contains, doc, either, every, filter, filterPassedAndFailedTests, forEachTemplate, indexOf, isArguments, isArray, isBoolean, isDate, isError, isFunction, isNull, isNumber, isObject, isRegExp, isString, isUndefined, map, maybe, message_failed, message_passed, pluck, predicate, reduce, results, some, stringify, summaryTemplate, test, testIdToString, testTemplate, testsTemplate, timesTwo, txt, valueToString;

  test = require("tape");

  compose = require("../../build/backwards.dev").compose;

  txt = "backwards.compose should";

  addOne = function(x) {
    return x + 1;
  };

  timesTwo = function(x) {
    return x * 2;
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof compose, "function");
    return t.end();
  });

  test("" + txt + " compose functions correctly", function(t) {
    var nine, ten;
    nine = compose(addOne, timesTwo)(4);
    ten = compose(timesTwo, addOne)(4);
    t.equal(nine, 9);
    t.equal(ten, 10);
    return t.end();
  });

  test = require("tape");

  contains = require("../../build/backwards.dev").contains;

  txt = "backwards.contains should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof contains, "function");
    return t.end();
  });

  test("" + txt + " return the correct value ...", function(t) {
    var array;
    array = [1, 2, 3, NaN];
    t.equal(contains(2, 0, array), true);
    t.equal(contains(4, 0, array), false);
    t.equal(contains(3, 3, array), false);
    t.equal(contains(3, -2, array), true);
    t.equal(contains(NaN, 0, array), true);
    t.equal(contains(2, -8, array), true);
    return t.end();
  });

  test = require("tape");

  either = require("../../build/backwards.dev").either;

  txt = "backwards.either should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof either, "function");
    return t.end();
  });

  test("" + txt + " return the first value if the second value does not exist", function(t) {
    t.equal(either(123, void 0), 123);
    t.equal(either(123, null), 123);
    return t.end();
  });

  test("" + txt + " return the second value if it exist", function(t) {
    t.equal(either(123, 456), 456);
    return t.end();
  });

  test = require("tape");

  every = require("../../build/backwards.dev").every;

  txt = "backwards.every should";

  predicate = function(x) {
    return x > 10;
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof every, "function");
    return t.end();
  });

  test("" + txt + " return true if every value conforms with the predicate", function(t) {
    t.equal(every(predicate, [12, 54, 18, 130, 44]), true);
    return t.end();
  });

  test("" + txt + " return true if given an empty Array", function(t) {
    t.equal(every(predicate, []), true);
    return t.end();
  });

  test("" + txt + " return false if not every value conforms with the predicate", function(t) {
    t.equal(every(predicate, [12, 5, 8, 130, 44]), false);
    return t.end();
  });

  test = require("tape");

  filter = require("../../build/backwards.dev").filter;

  txt = "backwards.filter should";

  predicate = function(x) {
    return x > 10;
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof filter, "function");
    return t.end();
  });

  test("" + txt + " filter Arrays correctly", function(t) {
    var array, filteredArray;
    array = [12, 5, 8, 130, 44];
    filteredArray = [12, 130, 44];
    t.equal(filter(predicate, array).toString(), filteredArray.toString());
    return t.end();
  });

  test = require("tape");

  indexOf = require("../../build/backwards.dev").indexOf;

  txt = "backwards.indexOf should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof indexOf, "function");
    return t.end();
  });

  test("" + txt + " indexOf functions correctly", function(t) {
    var array;
    array = [2, 5, 9];
    t.equal(indexOf(2, 0, array), 0);
    t.equal(indexOf(7, 0, array), -1);
    t.equal(indexOf(9, 2, array), 2);
    t.equal(indexOf(2, -1, array), -1);
    t.equal(indexOf(2, -3, array), 0);
    t.equal(indexOf(2, -8, array), 0);
    return t.end();
  });

  test("" + txt + " return the correct result in this use-case", function(t) {
    var array, result, tmp;
    array = ["a", "b", "a", "c", "a", "d"];
    result = [];
    tmp = indexOf("a", 0, array);
    while (tmp !== -1) {
      result.push(tmp);
      tmp = indexOf("a", ++tmp, array);
    }
    t.equal(result.toString(), [0, 2, 4].toString());
    return t.end();
  });

  test = require("tape");

  isArguments = require("../../build/backwards.dev").isArguments;

  txt = "backwards.isArguments should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isArguments, "function");
    return t.end();
  });

  test("" + txt + " return true if given an Arguments-object", function(t) {
    t.equal(isArguments(arguments), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isArguments([]), false);
    t.equal(isArguments(new Array()), false);
    t.equal(isArguments(true), false);
    t.equal(isArguments(new Date()), false);
    t.equal(isArguments(new Error()), false);
    t.equal(isArguments(new TypeError()), false);
    t.equal(isArguments(function(x) {
      return x;
    }), false);
    t.equal(isArguments(new Function()), false);
    t.equal(isArguments(1234), false);
    t.equal(isArguments(Infinity), false);
    t.equal(isArguments(NaN), false);
    t.equal(isArguments(new Number()), false);
    t.equal(isArguments({}), false);
    t.equal(isArguments(new Object()), false);
    t.equal(isArguments(/./), false);
    t.equal(isArguments(new RegExp()), false);
    t.equal(isArguments("string"), false);
    t.equal(isArguments(new String()), false);
    t.equal(isArguments(null), false);
    t.equal(isArguments(void 0), false);
    return t.end();
  });

  test = require("tape");

  isArray = require("../../build/backwards.dev").isArray;

  txt = "backwards.isArray should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isArray, "function");
    return t.end();
  });

  test("" + txt + " return true if given an Array", function(t) {
    t.equal(isArray([]), true);
    t.equal(isArray(new Array()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isArray(arguments), false);
    t.equal(isArray(true), false);
    t.equal(isArray(new Date()), false);
    t.equal(isArray(new Error()), false);
    t.equal(isArray(new TypeError()), false);
    t.equal(isArray(function(x) {
      return x;
    }), false);
    t.equal(isArray(new Function()), false);
    t.equal(isArray(1234), false);
    t.equal(isArray(Infinity), false);
    t.equal(isArray(NaN), false);
    t.equal(isArray(new Number()), false);
    t.equal(isArray({}), false);
    t.equal(isArray(new Object()), false);
    t.equal(isArray(/./), false);
    t.equal(isArray(new RegExp()), false);
    t.equal(isArray("string"), false);
    t.equal(isArray(new String()), false);
    t.equal(isArray(null), false);
    t.equal(isArray(void 0), false);
    return t.end();
  });

  test = require("tape");

  isBoolean = require("../../build/backwards.dev").isBoolean;

  txt = "backwards.isBoolean should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isBoolean, "function");
    return t.end();
  });

  test("" + txt + " return true if given a Boolean", function(t) {
    t.equal(isBoolean(true), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isBoolean(arguments), false);
    t.equal(isBoolean([]), false);
    t.equal(isBoolean(new Array()), false);
    t.equal(isBoolean(new Date()), false);
    t.equal(isBoolean(new Error()), false);
    t.equal(isBoolean(new TypeError()), false);
    t.equal(isBoolean(function(x) {
      return x;
    }), false);
    t.equal(isBoolean(new Function()), false);
    t.equal(isBoolean(1234), false);
    t.equal(isBoolean(Infinity), false);
    t.equal(isBoolean(NaN), false);
    t.equal(isBoolean(new Number()), false);
    t.equal(isBoolean({}), false);
    t.equal(isBoolean(new Object()), false);
    t.equal(isBoolean(/./), false);
    t.equal(isBoolean(new RegExp()), false);
    t.equal(isBoolean("string"), false);
    t.equal(isBoolean(new String()), false);
    t.equal(isBoolean(null), false);
    t.equal(isBoolean(void 0), false);
    return t.end();
  });

  test = require("tape");

  isDate = require("../../build/backwards.dev").isDate;

  txt = "backwards.isDate should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isDate, "function");
    return t.end();
  });

  test("" + txt + " return true if given a Date", function(t) {
    t.equal(isDate(new Date()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isDate(arguments), false);
    t.equal(isDate([]), false);
    t.equal(isDate(new Array()), false);
    t.equal(isDate(true), false);
    t.equal(isDate(new Error()), false);
    t.equal(isDate(new TypeError()), false);
    t.equal(isDate(function(x) {
      return x;
    }), false);
    t.equal(isDate(new Function()), false);
    t.equal(isDate(1234), false);
    t.equal(isDate(Infinity), false);
    t.equal(isDate(NaN), false);
    t.equal(isDate(new Number()), false);
    t.equal(isDate({}), false);
    t.equal(isDate(new Object()), false);
    t.equal(isDate(/./), false);
    t.equal(isDate(new RegExp()), false);
    t.equal(isDate("string"), false);
    t.equal(isDate(new String()), false);
    t.equal(isDate(null), false);
    t.equal(isDate(void 0), false);
    return t.end();
  });

  test = require("tape");

  isError = require("../../build/backwards.dev").isError;

  txt = "backwards.isError should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isError, "function");
    return t.end();
  });

  test("" + txt + " return true if given an Error", function(t) {
    t.equal(isError(new Error()), true);
    t.equal(isError(new TypeError()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isError(arguments), false);
    t.equal(isError([]), false);
    t.equal(isError(new Array()), false);
    t.equal(isError(true), false);
    t.equal(isError(new Date()), false);
    t.equal(isError(function(x) {
      return x;
    }), false);
    t.equal(isError(new Function()), false);
    t.equal(isError(1234), false);
    t.equal(isError(Infinity), false);
    t.equal(isError(NaN), false);
    t.equal(isError(new Number()), false);
    t.equal(isError({}), false);
    t.equal(isError(new Object()), false);
    t.equal(isError(/./), false);
    t.equal(isError(new RegExp()), false);
    t.equal(isError("string"), false);
    t.equal(isError(new String()), false);
    t.equal(isError(null), false);
    t.equal(isError(void 0), false);
    return t.end();
  });

  test = require("tape");

  isFunction = require("../../build/backwards.dev").isFunction;

  txt = "backwards.isFunction should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isFunction, "function");
    return t.end();
  });

  test("" + txt + " return true if given a Function", function(t) {
    t.equal(isFunction(function(x) {
      return x;
    }), true);
    t.equal(isFunction(new Function()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isFunction(arguments), false);
    t.equal(isFunction([]), false);
    t.equal(isFunction(new Array()), false);
    t.equal(isFunction(true), false);
    t.equal(isFunction(new Date()), false);
    t.equal(isFunction(new Error()), false);
    t.equal(isFunction(new TypeError()), false);
    t.equal(isFunction(1234), false);
    t.equal(isFunction(Infinity), false);
    t.equal(isFunction(NaN), false);
    t.equal(isFunction(new Number()), false);
    t.equal(isFunction({}), false);
    t.equal(isFunction(new Object()), false);
    t.equal(isFunction(/./), false);
    t.equal(isFunction(new RegExp()), false);
    t.equal(isFunction("string"), false);
    t.equal(isFunction(new String()), false);
    t.equal(isFunction(null), false);
    t.equal(isFunction(void 0), false);
    return t.end();
  });

  test = require("tape");

  isNull = require("../../build/backwards.dev").isNull;

  txt = "backwards.isNull should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isNull, "function");
    return t.end();
  });

  test("" + txt + " return true if given a Null", function(t) {
    t.equal(isNull(null), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isNull(arguments), false);
    t.equal(isNull([]), false);
    t.equal(isNull(new Array()), false);
    t.equal(isNull(true), false);
    t.equal(isNull(new Date()), false);
    t.equal(isNull(new Error()), false);
    t.equal(isNull(new TypeError()), false);
    t.equal(isNull(function(x) {
      return x;
    }), false);
    t.equal(isNull(new Function()), false);
    t.equal(isNull(1234), false);
    t.equal(isNull(Infinity), false);
    t.equal(isNull(NaN), false);
    t.equal(isNull(new Number()), false);
    t.equal(isNull({}), false);
    t.equal(isNull(new Object()), false);
    t.equal(isNull(/./), false);
    t.equal(isNull(new RegExp()), false);
    t.equal(isNull("string"), false);
    t.equal(isNull(new String()), false);
    t.equal(isNull(void 0), false);
    return t.end();
  });

  test = require("tape");

  isNumber = require("../../build/backwards.dev").isNumber;

  txt = "backwards.isNumber should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isNumber, "function");
    return t.end();
  });

  test("" + txt + " return true if given a Number", function(t) {
    t.equal(isNumber(1234), true);
    t.equal(isNumber(Infinity), true);
    t.equal(isNumber(NaN), true);
    t.equal(isNumber(new Number()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isNumber(arguments), false);
    t.equal(isNumber([]), false);
    t.equal(isNumber(new Array()), false);
    t.equal(isNumber(true), false);
    t.equal(isNumber(new Date()), false);
    t.equal(isNumber(new Error()), false);
    t.equal(isNumber(new TypeError()), false);
    t.equal(isNumber(function(x) {
      return x;
    }), false);
    t.equal(isNumber(new Function()), false);
    t.equal(isNumber({}), false);
    t.equal(isNumber(new Object()), false);
    t.equal(isNumber(/./), false);
    t.equal(isNumber(new RegExp()), false);
    t.equal(isNumber("string"), false);
    t.equal(isNumber(new String()), false);
    t.equal(isNumber(null), false);
    t.equal(isNumber(void 0), false);
    return t.end();
  });

  test = require("tape");

  isObject = require("../../build/backwards.dev").isObject;

  txt = "backwards.isObject should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isObject, "function");
    return t.end();
  });

  test("" + txt + " return true if given an Object", function(t) {
    t.equal(isObject({}), true);
    t.equal(isObject(new Object()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isObject(arguments), false);
    t.equal(isObject([]), false);
    t.equal(isObject(new Array()), false);
    t.equal(isObject(true), false);
    t.equal(isObject(new Date()), false);
    t.equal(isObject(new Error()), false);
    t.equal(isObject(new TypeError()), false);
    t.equal(isObject(function(x) {
      return x;
    }), false);
    t.equal(isObject(new Function()), false);
    t.equal(isObject(1234), false);
    t.equal(isObject(Infinity), false);
    t.equal(isObject(NaN), false);
    t.equal(isObject(new Number()), false);
    t.equal(isObject(/./), false);
    t.equal(isObject(new RegExp()), false);
    t.equal(isObject("string"), false);
    t.equal(isObject(new String()), false);
    t.equal(isObject(null), false);
    t.equal(isObject(void 0), false);
    return t.end();
  });

  test = require("tape");

  isRegExp = require("../../build/backwards.dev").isRegExp;

  txt = "backwards.isRegExp should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isRegExp, "function");
    return t.end();
  });

  test("" + txt + " return true if given a RegExp", function(t) {
    t.equal(isRegExp(/./), true);
    t.equal(isRegExp(new RegExp()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isRegExp(arguments), false);
    t.equal(isRegExp([]), false);
    t.equal(isRegExp(new Array()), false);
    t.equal(isRegExp(true), false);
    t.equal(isRegExp(new Date()), false);
    t.equal(isRegExp(new Error()), false);
    t.equal(isRegExp(new TypeError()), false);
    t.equal(isRegExp(function(x) {
      return x;
    }), false);
    t.equal(isRegExp(new Function()), false);
    t.equal(isRegExp(1234), false);
    t.equal(isRegExp(Infinity), false);
    t.equal(isRegExp(NaN), false);
    t.equal(isRegExp(new Number()), false);
    t.equal(isRegExp({}), false);
    t.equal(isRegExp(new Object()), false);
    t.equal(isRegExp("string"), false);
    t.equal(isRegExp(new String()), false);
    t.equal(isRegExp(null), false);
    t.equal(isRegExp(void 0), false);
    return t.end();
  });

  test = require("tape");

  isString = require("../../build/backwards.dev").isString;

  txt = "backwards.isString should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isString, "function");
    return t.end();
  });

  test("" + txt + " return true if given a String", function(t) {
    t.equal(isString("string"), true);
    t.equal(isString(new String()), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isString(arguments), false);
    t.equal(isString([]), false);
    t.equal(isString(new Array()), false);
    t.equal(isString(true), false);
    t.equal(isString(new Date()), false);
    t.equal(isString(new Error()), false);
    t.equal(isString(new TypeError()), false);
    t.equal(isString(function(x) {
      return x;
    }), false);
    t.equal(isString(new Function()), false);
    t.equal(isString(1234), false);
    t.equal(isString(Infinity), false);
    t.equal(isString(NaN), false);
    t.equal(isString(new Number()), false);
    t.equal(isString({}), false);
    t.equal(isString(new Object()), false);
    t.equal(isString(/./), false);
    t.equal(isString(new RegExp()), false);
    t.equal(isString(null), false);
    t.equal(isString(void 0), false);
    return t.end();
  });

  test = require("tape");

  isUndefined = require("../../build/backwards.dev").isUndefined;

  txt = "backwards.isUndefined should";

  test("" + txt + " be a function", function(t) {
    t.equal(typeof isUndefined, "function");
    return t.end();
  });

  test("" + txt + " return true if given an Undefined", function(t) {
    t.equal(isUndefined(void 0), true);
    return t.end();
  });

  test("" + txt + " return false if given anything else", function(t) {
    t.equal(isUndefined(arguments), false);
    t.equal(isUndefined([]), false);
    t.equal(isUndefined(new Array()), false);
    t.equal(isUndefined(true), false);
    t.equal(isUndefined(new Date()), false);
    t.equal(isUndefined(new Error()), false);
    t.equal(isUndefined(new TypeError()), false);
    t.equal(isUndefined(function(x) {
      return x;
    }), false);
    t.equal(isUndefined(new Function()), false);
    t.equal(isUndefined(1234), false);
    t.equal(isUndefined(Infinity), false);
    t.equal(isUndefined(NaN), false);
    t.equal(isUndefined(new Number()), false);
    t.equal(isUndefined({}), false);
    t.equal(isUndefined(new Object()), false);
    t.equal(isUndefined(/./), false);
    t.equal(isUndefined(new RegExp()), false);
    t.equal(isUndefined("string"), false);
    t.equal(isUndefined(new String()), false);
    t.equal(isUndefined(null), false);
    return t.end();
  });

  test = require("tape");

  map = require("../../build/backwards.dev").map;

  txt = "backwards.map should";

  addOne = function(x) {
    return x + 1;
  };

  timesTwo = function(x) {
    return x * 2;
  };

  stringify = function(x) {
    return "{ id: " + x.id + ", name: " + x.name + " }";
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof map, "function");
    return t.end();
  });

  test("" + txt + " map over Arrays and not cause side-effects", function(t) {
    var actual, array, expected, mappedArray;
    array = [1, 2, 3];
    actual = array.toString();
    expected = [2, 3, 4].toString();
    mappedArray = map(addOne, array).toString();
    t.equal(mappedArray, expected);
    t.equal(array.toString(), actual);
    return t.end();
  });

  test("" + txt + " map over Objects and not cause side-effects", function(t) {
    var actual, expected, mappedObj, obj;
    obj = {
      id: 1,
      name: "Some String"
    };
    actual = stringify(obj);
    expected = stringify({
      id: 2,
      name: "Some String1"
    });
    mappedObj = stringify(map(addOne, obj));
    t.equal(mappedObj, expected);
    t.equal(stringify(obj), actual);
    return t.end();
  });

  test("" + txt + " map over Booleans and not cause side-effects", function(t) {
    var bool;
    bool = true;
    t.equal(map(addOne, bool), 2);
    t.equal(bool, true);
    return t.end();
  });

  test("" + txt + " map over Dates and not cause side-effects", function(t) {
    var actual, date;
    date = new Date();
    actual = date.toString();
    t.equal(map(addOne, date), "" + (date.toString()) + "1");
    t.equal(date.toString(), actual);
    return t.end();
  });

  test("" + txt + " map over Errors and not cause side-effects", function(t) {
    var actual, error;
    error = new Error("This is an error message");
    actual = error.toString();
    t.equal(map(addOne, error), "" + (error.toString()) + "1");
    t.equal(error.toString(), actual);
    return t.end();
  });

  test("" + txt + " map over Numbers and not cause side-effects", function(t) {
    var num;
    num = 1;
    t.equal(map(addOne, num), 2);
    t.equal(num, 1);
    return t.end();
  });

  test("" + txt + " map over Strings and not cause side-effects", function(t) {
    var string;
    string = "string";
    t.equal(map(addOne, string), "string1");
    t.equal(string, "string");
    return t.end();
  });

  test = require("tape");

  maybe = require("../../build/backwards.dev").maybe;

  txt = "backwards.maybe should";

  timesTwo = function(x) {
    return x * 2;
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof maybe, "function");
    return t.end();
  });

  test("" + txt + " execute the given function if given something that is not null or undefined", function(t) {
    t.equal(maybe(timesTwo, 123), 246);
    return t.end();
  });

  test("" + txt + " not execute the given function if given something that is null or undefined", function(t) {
    t.equal(maybe(timesTwo, void 0), void 0);
    t.equal(maybe(timesTwo, null), void 0);
    return t.end();
  });

  test = require("tape");

  reduce = require("../../build/backwards.dev").reduce;

  txt = "backwards.reduce should";

  add = function(a, b) {
    return a + b;
  };

  append = function(a, b) {
    return a.concat(b);
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof reduce, "function");
    return t.end();
  });

  test("" + txt + " reduce Arrays down to a single value", function(t) {
    t.equal(reduce(add, 0, [0, 1, 2, 3]), 6);
    return t.end();
  });

  test("" + txt + " reduce Arrays in the 'proper' order", function(t) {
    var expected, flatten, flattenedArray;
    flatten = reduce(append, []);
    flattenedArray = flatten([[0, 1], [2, 3], [4, 5]]);
    expected = [0, 1, 2, 3, 4, 5];
    t.equal(flattenedArray.toString(), expected.toString());
    return t.end();
  });

  test = require("tape");

  some = require("../../build/backwards.dev").some;

  txt = "backwards.some should";

  predicate = function(x) {
    return x > 10;
  };

  test("" + txt + " be a function", function(t) {
    t.equal(typeof some, "function");
    return t.end();
  });

  test("" + txt + " return true if some of the values in the Array conforms with the predicate", function(t) {
    t.equal(some(predicate, [12, 5, 8, 1, 4]), true);
    return t.end();
  });

  test("" + txt + " return false if none of the values in the Array conforms with the predicate", function(t) {
    t.equal(some(predicate, [2, 5, 8, 1, 4]), false);
    return t.end();
  });

  test("" + txt + " return false if given an empty Array", function(t) {
    t.equal(some(predicate, []), false);
    return t.end();
  });

  "use strict";

  either = function(a, b) {
    return function(x) {
      if (x) {
        return a;
      } else {
        return b;
      }
    };
  };

  reduce = function(f, acc, x) {
    var i, _i, _len, _x;
    for (i = _i = 0, _len = x.length; _i < _len; i = ++_i) {
      _x = x[i];
      acc = f(acc, _x, i, x);
    }
    return acc;
  };

  every = function(f, x) {
    var i, _i, _len, _x;
    for (i = _i = 0, _len = x.length; _i < _len; i = ++_i) {
      _x = x[i];
      if (!f(_x, i, x)) {
        return false;
      }
    }
    return true;
  };

  pluck = function(key) {
    return function(x) {
      return x[key];
    };
  };

  valueToString = function(x) {
    if (x) {
      return x.toString();
    } else if (x === false) {
      return "false";
    } else if (x === 0) {
      return "0";
    } else {
      return "undefined";
    }
  };

  testIdToString = function(x) {
    if (x < 10) {
      return "000" + x;
    } else if (x < 100) {
      return "00" + x;
    } else if (x < 1000) {
      return "0" + x;
    } else {
      return x;
    }
  };

  forEachTemplate = function(template, x) {
    return reduce((function(str, x) {
      return str += template(x);
    }), '', x);
  };

  summaryTemplate = function(x) {
    return "<div class=\"container\"> <span class=\"title\">" + x.title + "</span> <div class=\"results\"> <span class=\"total\">Total: " + x.total + "</span> <span class=\"passed\">Passed: " + x.passed + "</span> <span class=\"failed\">Failed: " + x.failed + "</span> </div> </div>";
  };

  assertionsTemplate = function(x) {
    return "<li> <span class=\"number\">" + (testIdToString(x.id)) + "</span> " + (valueToString(x.actual)) + " === " + (valueToString(x.expected)) + " </li>";
  };

  testTemplate = function(x) {
    return "<ul> <li> <h2>" + x.name + "</h2> <ul> " + (forEachTemplate(assertionsTemplate, x.tests)) + " </ul> </li> </ul>";
  };

  testsTemplate = function(x) {
    return "<h1>" + x.title + "</h1> " + (forEachTemplate(testTemplate, x.tests));
  };

  filterPassedAndFailedTests = function(x) {
    return reduce((function(acc, test) {
      if (every(pluck("passed"), test.tests)) {
        acc.passed.push(test);
      } else {
        acc.failed.push(test);
      }
      return acc;
    }), {
      passed: [],
      failed: []
    }, x);
  };

  results = require("tape").results;

  results.tests = filterPassedAndFailedTests(results.tests);

  doc = window.document;

  $body = doc.getElementsByTagName("body")[0];

  $message = doc.getElementById("message");

  $summary = doc.getElementById("summary");

  $failedtests = doc.getElementById("failed-tests");

  $passedtests = doc.getElementById("passed-tests");

  $modal = doc.getElementById("modal");

  message_failed = "Hmmm... Seems you have some more work to do before you can celebrate...";

  message_passed = "Congratulations! All your tests have been successfully completed!";


  /*
  Declare Sauce Labs Test Results Object
  ======================================
  
  Make sure that window.global_test_results.tests only contains the 
  failed tests since they have a low buffer-size restriction that will 
  cause the "job" to fail or return undefined if exceeded.
   */

  window.global_test_results = {
    passed: results.passed,
    failed: results.failed,
    total: results.total,
    tests: results.tests.failed
  };


  /*
  Build User Interface
  ====================
   */

  $summary.innerHTML = summaryTemplate({
    title: "backwards.js",
    total: results.total,
    passed: results.passed,
    failed: results.failed
  });

  if (results.tests.failed.length) {
    $failedtests.innerHTML = testsTemplate({
      title: "Failed Tests",
      tests: results.tests.failed
    });
  }

  if (results.tests.passed.length) {
    $passedtests.innerHTML = testsTemplate({
      title: "Passed Tests",
      tests: results.tests.passed
    });
  }


  /*
  Message
  =======
  
  Display a humouristic message based on either all 
  tests passed or not.
   */

  $message.innerHTML = either(message_failed, message_passed)(results.tests.failed.length);

}).call(this);
