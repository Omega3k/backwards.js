(function() {
  "use strict";
  var $body, $failedtests, $message, $modal, $passedtests, $summary, assertionsTemplate, doc, either, every, filterPassedAndFailedTests, forEachTemplate, message_failed, message_passed, pluck, reduce, results, summaryTemplate, testIdToString, testTemplate, testsTemplate, valueToString;

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

  $modal.innerHTML = "Mouse Cursor here";

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

//# sourceMappingURL=ux.js.map
