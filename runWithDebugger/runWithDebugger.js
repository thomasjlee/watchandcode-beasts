(function () {
  'use strict';
  
  function runWithDebugger(callback, args) {
    // debugger;
    return callback.apply(null, args);
  };

  window.runWithDebugger = runWithDebugger;
}());
