var assignStringToID = (function () {
  var elements = {};

  return function (id, str) {
    var el = elements[id] || document.getElementById( id );
    return el.innerHTML = str;
  };
}());

function add (a, b) {
  return a + b;
}

function append (a, b) {
  return a += b;
}

function reduce (f, acc, x) {
  var i = 0, len = x.length;
  while (i < len) {
    if (i in x) {
      acc = f(acc, x[i], i, x);
    }
    i++;
  }
  return acc;
}

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

function forEachTemplate (template, x) {
  return reduce(function (str, x) {
    return str += template( x );
  }, '', x);
}

function summaryTemplate (x) {
  return [
    // '<h1>', x.title, '</h1>'
    '<span class="title">', x.title, '</span>'
  , '<span class="total">Total: ', x.total, '</span>'
  , '<span class="passed">Passed: ', x.passed, '</span>'
  , '<span class="failed">Failed: ', x.failed, '</span>'
  ].join('');
}

function summaryTemplate (x) {
  return ''
  + '<div class="container">'
    + '<span class="title">' + x.title + '</span>'
    + '<div class="results">'
      + '<span class="total">Total: ' + x.total + '</span>'
      + '<span class="passed">Passed: ' + x.passed + '</span>'
      + '<span class="failed">Failed: ' + x.failed + '</span>'
    + '</div>'
  + '</div>'
  ;
}

function assertionsTemplate (x) {
  return [
    '<li>'
    , '<span class="number">', x.id, '</span>'
    , x.actual || 'undefined', ' === ', x.expected || 'undefined'
  , '</li>'
  ].join('');
}

function testTemplate (x) {
  return [
    '<ul>'
    , '<li>'
      , '<h2>', x.name, '</h2>'
      , '<ul>'
        , forEachTemplate( assertionsTemplate, x.tests )
      , '</ul>'
    , '</li>'
  , '</ul>'
  ].join('');
}

function testsTemplate (x) {
  return ''
    + '<h1>' + x.title + '</h1>'
    + forEachTemplate( testTemplate, x.tests );
}

function filterPassedAndFailedTests (list) {
  return reduce(function (acc, test) {
    every(function (t) {
      return t.passed;
    }, test.tests) ? acc.passed.push(test) : acc.failed.push(test);
    return acc;
  }, { passed: [], failed: [] }, list);
}

var results   = require('tape').results;
results.tests = filterPassedAndFailedTests( results.tests );
// var list    = filterPassedAndFailedTests( results.tests );

window.global_test_results = {
  passed: results.passed,
  failed: results.failed,
  total : results.total,
  tests : results.tests.failed
};

assignStringToID('summary', summaryTemplate({
  title : 'backwards.js',
  total : results.total,
  passed: results.passed,
  failed: results.failed
}));

if (results.tests.failed.length) {
  assignStringToID('failed-tests', testsTemplate({
    title: 'Failed Tests',
    tests: results.tests.failed
  }));
} else {
  assignStringToID('failed-tests', testsTemplate({
    title: 'Congratulations !!!',
    tests: results.tests.failed
  }));
}

assignStringToID('passed-tests', testsTemplate({
    title: 'Passed Tests',
    tests: results.tests.passed
  }));