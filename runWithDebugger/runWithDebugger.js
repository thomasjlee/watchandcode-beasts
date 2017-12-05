function runWithDebugger(callback, args) {
  // debugger;
  return callback.apply(null, args);
}
