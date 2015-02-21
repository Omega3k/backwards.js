"use strict"

valueToString = (x) ->
  if x then x.toString()
  else if x is false then "false"
  else if x is 0 then "0"
  else "undefined"

testIdToString = (x) ->
  if x < 10 then "000" + x
  else if x < 100 then "00" + x
  else if x < 1000 then "0" + x
  else x

forEachTemplate = (template, x) ->
  reduce ((str, x) ->
    str += template x
    ), '', x

summaryTemplate = (x) ->
  "
  <div class=\"container\">
    <span class=\"title\">#{ x.title }</span>
    <div class=\"results\">
      <span class=\"total\">Total: #{ x.total }</span>
      <span class=\"passed\">Passed: #{ x.passed }</span>
      <span class=\"failed\">Failed: #{ x.failed }</span>
    </div>
  </div>
  "
assertionsTemplate = (x) ->
  "
  <li>
    <span class=\"number\">#{ testIdToString x.id }</span>
    #{ valueToString x.actual } === #{ valueToString x.expected }
  </li>
  "

testTemplate = (x) ->
  "
  <ul>
    <li>
      <h2>#{ x.name }</h2>
      <ul>
        #{ forEachTemplate assertionsTemplate, x.tests }
      </ul>
    </li>
  </ul>
  "

testsTemplate = (x) ->
  "
  <h1>#{ x.title }</h1>
  #{ forEachTemplate testTemplate, x.tests }
  "


results   = require( "tape" ).results
_         = require "backwards"
compose   = _.compose
curry     = _.curry
every     = _.every
partition = _.partition
reduce    = _.reduce

_dev      = require "../../build/backwards.dev"
pluck     = _dev.pluck

assign    = curry (a, b) -> a = b


# get = curry (key, x) ->
#   x[key]

# pluck = get

# set = curry (object, key, value) ->
#   if key? then object[key] = value else object = value
#   object


###
Declare Sauce Labs Test Results Object
======================================

Make sure that window.global_test_results.tests only contains information about the failed tests since Sauce Labs have a low buffer-size restriction that will cause the "job" to fail or return undefined if exceeded. 
###


buildTestsObjectFromPartitionList = (list) ->
  {
    passed: list[0]
    failed: list[1]
  }


# results.tests = compose(
#   # set results, "tests"
#   buildTestsObjectFromPartitionList
#   partition(
#     compose(
#       every pluck "passed"
#       pluck "tests"
#       )
#     )
#   )( results.tests )


buildTestsObject = compose(
  buildTestsObjectFromPartitionList
  partition(
    compose(
      every pluck "passed"
      pluck "tests"
      )
    )
  )


results.tests = buildTestsObject results.tests

window.global_test_results =
  passed: results.passed
  failed: results.failed
  total : results.total
  tests : results.tests.failed


###
Build User Interface
====================
###

doc           = window.document
$body         = doc.getElementsByTagName( "body" )[ 0 ]
$message      = doc.getElementById "message"
$summary      = doc.getElementById "summary"
$failedtests  = doc.getElementById "failed-tests"
$passedtests  = doc.getElementById "passed-tests"


message_failed = "
  Hmmm... Seems you have some more work to do before you can celebrate..."

message_passed = "
  Congratulations! All your tests have been successfully completed!"

$summary.innerHTML = summaryTemplate
  title : "backwards.js"
  total : results.total
  passed: results.passed
  failed: results.failed

if results.tests.failed.length
  $failedtests.innerHTML = testsTemplate
    title: "Failed Tests"
    tests: results.tests.failed

if results.tests.passed.length
  $passedtests.innerHTML = testsTemplate
    title: "Passed Tests"
    tests: results.tests.passed


###
Message
=======

Display a humouristic message based on either all 
tests passed or not. 
###

$message.innerHTML = if results.tests.failed.length then message_failed else message_passed