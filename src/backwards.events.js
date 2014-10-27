(function (root, name, dependencies, factory) {

  function reduce (f, acc, x) {
    var i   = 0
      , len = x.length;
    while (i < len) {
      if (i in x) {
        acc = f(acc, x[i], i, x);
      }
      i++;
    }
    return acc;
  }

  if (typeof define === 'function' && define.amd) {
    // Register as a named AMD module.
    define(name, dependencies, factory);
  } else if (typeof exports !== 'undefined') {
    reduce(function (acc, val, i) {
      acc[i] = require(val);
      return acc;
    }, dependencies, dependencies);
    // module.exports = factory(require('b'));
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory.apply(factory, dependencies);
    }
    exports[name] = factory.apply(factory, dependencies);
  } else {
    reduce(function (acc, val, i) {
      acc[i] = root[val];
      return acc;
    }, dependencies, dependencies);
    // Browser globals (root is window)
    root[name] = factory.apply(factory, dependencies);
  }
}(this, 'backwards.events', ['../src/backwards'], function (b) {
  'use strict';

// https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
// ;(function(d){

//   // the topic/subscription hash
//   var cache = {};

//   d.publish = function(/* String */topic, /* Array? */args){
//     // summary: 
//     //    Publish some data on a named topic.
//     // topic: String
//     //    The channel to publish on
//     // args: Array?
//     //    The data to publish. Each array item is converted into an ordered
//     //    arguments on the subscribed functions. 
//     //
//     // example:
//     //    Publish stuff on '/some/topic'. Anything subscribed will be called
//     //    with a function signature like: function(a,b,c){ ... }
//     //
//     //  |   $.publish("/some/topic", ["a","b","c"]);
//     cache[topic] && d.each(cache[topic], function(){
//       this.apply(d, args || []);
//     });
//   };

//   d.subscribe = function(/* String */topic, /* Function */callback){
//     // summary:
//     //    Register a callback on a named topic.
//     // topic: String
//     //    The channel to subscribe to
//     // callback: Function
//     //    The handler event. Anytime something is $.publish'ed on a 
//     //    subscribed channel, the callback will be called with the
//     //    published array as ordered arguments.
//     //
//     // returns: Array
//     //    A handle which can be used to unsubscribe this particular subscription.
//     //  
//     // example:
//     //  | $.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
//     //
//     if(!cache[topic]){
//       cache[topic] = [];
//     }
//     cache[topic].push(callback);
//     return [topic, callback]; // Array
//   };

//   d.unsubscribe = function(/* Array */handle){
//     // summary:
//     //    Disconnect a subscribed function for a topic.
//     // handle: Array
//     //    The return value from a $.subscribe call.
//     // example:
//     //  | var handle = $.subscribe("/something", function(){});
//     //  | $.unsubscribe(handle);
    
//     var t = handle[0];
//     cache[t] && d.each(cache[t], function(idx){
//       if(this == handle[1]){
//         cache[t].splice(idx, 1);
//       }
//     });
//   };

// })(jQuery);

  var autoCurry   = b.autoCurry
    , compose     = b.compose
    , forEach     = b.forEach
    , maybe       = b.maybe
    , either      = b.either
    , push        = b.push
    , splice      = b.splice

    , subscribers = {};

  function publish (topic, data) {
    var broadcast = forEach(function (subscriber) {
      subscriber(data);
    });
    
    maybe( broadcast, subscribers[topic] );
  }

  function subscribe (topic, f) {
    compose(
      push(f), 
      either( subscribers[topic] = [], subscribers[topic] )
    );
    return [topic, f];
  }

  function unsubscribe (x) {
    var list = subscribers[x[0]]
      , f    = x[1];
    
    forEach(function (subscriber, i) {
      if (subscriber === f) {
        splice( i, 1, list );
      }
    }, list);
  }

  return {
    publish    : autoCurry(publish),
    subscribe  : autoCurry(subscribe),
    unsubscribe: autoCurry(unsubscribe)
  };
}));