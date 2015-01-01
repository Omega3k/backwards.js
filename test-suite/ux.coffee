"use strict"

either = (a, b) ->
  (x) ->
    if x then a
    else b

reduce = (f, acc, x) ->
  for _x, i in x
    acc = f acc, _x, i, x
  return acc

every = (f, x) ->
  for _x, i in x
    if not f _x, i, x
      return false
  return true

pluck = (key) ->
  (x) ->
    x[key]

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

filterPassedAndFailedTests = (x) ->
  reduce ((acc, test) ->
    if every pluck( "passed" ), test.tests
      acc.passed.push test
    else acc.failed.push test
    acc
    ), { passed: [], failed: [] }, x


results          = require( "tape" ).results
# EventStream      = require "EventStream"
results.tests    = filterPassedAndFailedTests results.tests
doc              = window.document

$body            = doc.getElementsByTagName( "body" )[ 0 ]
$message         = doc.getElementById "message"
$summary         = doc.getElementById "summary"
$failedtests     = doc.getElementById "failed-tests"
$passedtests     = doc.getElementById "passed-tests"
$modal           = doc.getElementById "modal"

$modal.innerHTML = "Mouse Cursor here"
message_failed   = "Hmmm... Seems you have some more work to do before you can celebrate..."
message_passed   = "Congratulations! All your tests have been successfully completed!"

###
Declare Sauce Labs Test Results Object
======================================

Make sure that window.global_test_results.tests only contains the 
failed tests since they have a low buffer-size restriction that will 
cause the "job" to fail or return undefined if exceeded. 
###

window.global_test_results =
  passed: results.passed
  failed: results.failed
  total : results.total
  tests : results.tests.failed


###
Build User Interface
====================
###

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

$message.innerHTML = either(
  message_failed
  message_passed
  )( results.tests.failed.length )


# # Click Events

# globalClickEvent  = new EventStream "click", $body
# globalClickTarget = globalClickEvent.map (x) -> x.target
# globalClickNumber = globalClickEvent.map (x, i) -> i + 1

# logClicks = globalClickTarget.subscribe (val, i, ctx) ->
#   if i is 3
#     console.log "
#       globalClickEvent: Has run three times and is therefore 
#       unsubscribed. 
#       "
#     @unsubscribe()
#   else
#     console.log "globalClickEvent: ", i, val, ctx


# printNumberOfTimesClicked = globalClickNumber.subscribe (x) ->
#   $message.innerHTML = "
#     'window.document' has been clicked #{ x } times. 
#     "


# logNameClassClicked = globalClickTarget.subscribe (x) ->
#   console.log "
#     '<#{ x.localName } 
#     id=\"#{ x.id }\" 
#     class=\"#{ x.className }\">' has been clicked. 
#     "

# accumulatedNumber = globalClickNumber.reduce ((a, b) -> a += b), '0'

# logAccumulatedNumber = accumulatedNumber.subscribe (acc) ->
#   console.log "accumulatedNumber: #{ acc }"


# # Mouse Move Events

# globalMouseMove = new EventStream "mousemove", $body

# modalMouseMove = globalMouseMove.subscribe (x) ->
#   $modal.style.top  = "#{ x.pageY + 10 }px"
#   $modal.style.left = "#{ x.pageX + 10 }px"


# # Resize Events

# globalResizeEvent = new EventStream "resize", window

# logHeightWidth = globalResizeEvent.subscribe (x) ->
#   ref    = x.target
#   height = ref.innerHeight
#   width  = ref.innerWidth
#   console.log "
#     Window is resized to 
#     #{ width }px x #{ height }px ( width x height )
#     "

# globalResize800Plus = globalResizeEvent.filter (e) ->
#   e.target.innerWidth > 800

# logWidthWhenBiggerThan800 = globalResize800Plus.subscribe (e) ->
#   console.log "
#     Window is bigger than 800px in width
#     ( #{ e.target.innerWidth }px )
#     "