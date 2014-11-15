(function () {
  'use strict';

  var assignStringToID = (function () {
    var elements = {};

    return function (id, str) {
      var el = elements[id] || document.getElementById( id );
      return el.innerHTML = str;
    };
  }());

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

  function pluck (key) {
    return function (x) {
      return x[key];
    }
  }

  function valueToString (x) {
    if (x) {
      return x.toString();
    } else if (x === false) {
      return 'false';
    } else if (x === 0) {
      return '0';
    } else {
      return 'undefined';
    }
  }

  function testIdToString (x) {
    if (x < 10) {
      return '000' + x;
    } else if (x < 100) {
      return '00' + x;
    } else if (x < 1000) {
      return '0' + x;
    } else {
      return x;
    }
  }

  function forEachTemplate (template, x) {
    return reduce(function (str, x) {
      return str += template( x );
    }, '', x);
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
      , '<span class="number">', testIdToString( x.id ), '</span>'
      , valueToString( x.actual ), ' === ', valueToString( x.expected )
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
      every( pluck('passed') , test.tests ) ? 
        acc.passed.push( test ) : 
        acc.failed.push( test );
      return acc;
    }, { passed: [], failed: [] }, list);
  }

  var results   = require( 'tape' ).results;
  results.tests = filterPassedAndFailedTests( results.tests );


  // Declare Sauce Labs Test Results Object
  // ======================================
  // Make sure that window.global_test_results.tests only contains the failed 
  // tests since they have a low buffer-size restriction that will cause the 
  // "job" to fail or return undefined if overridden. 

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

  if ( results.tests.failed.length ) {
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
}());