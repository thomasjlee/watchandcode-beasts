(function () {
  var libraryStorage = {};

  function librarySystem(libraryName, dependencies, callback) {
    if (arguments.length > 1) {
      // Store libraries with dependencies if provided.
      if (!dependencies.length) {
        libraryStorage[libraryName] = callback();
      } else {
        var loadedDependencies = dependencies.map(function (dependency) {
          return libraryStorage[dependency];
        });

        libraryStorage[libraryName] = callback.apply(null, loadedDependencies);
      }
    } else {
      // Retrieve requested library.
      return libraryStorage[libraryName];
    }
  };

  window.librarySystem = librarySystem;
}());