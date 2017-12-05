(function () {
  var libraryStorage = {};

  // helper functions
  function dependenciesAvailable(dependencies) {
    var availableDependencies = 0;

    dependencies.forEach(function (dependency) {
      if (libraryStorage[dependency]) {
        availableDependencies++;
      }
    });

    return availableDependencies === dependencies.length;
  };

  // main
  function librarySystem(libraryName, dependencies, callback) {
    // storing the library
    if (arguments.length > 1) {
      // if no dependencies, or if called with second argument as callback, store the library
      if (!dependencies.length || typeof dependencies === 'function') {
        var callback = callback;
        
        if (typeof dependencies === 'function') {
         callback = dependencies;
        }

        libraryStorage[libraryName] = {
          library: callback()
        }
      } else {
        // if all dependencies available, store the library with dependencies
        if (dependenciesAvailable(dependencies)) {
          var loadedDependencies = dependencies.map(function (dependency) {
            return libraryStorage[dependency].library;
          });

          libraryStorage[libraryName] = {
            library: callback.apply(null, loadedDependencies),
          };
        } else {
          // otherwise, store dependencies array and callback to be called later
          libraryStorage[libraryName] = {
            library: callback,
            dependencies: dependencies
          };
        }
      }
    // loading a library
    } else {
      // if library was loaded without its dependencies, save the library again, this time with dependencies
      if (typeof libraryStorage[libraryName].library === 'function') {
        var dependencies = libraryStorage[libraryName].dependencies;

        if (dependenciesAvailable(dependencies)) {
          var callback = libraryStorage[libraryName].library;
          librarySystem(libraryName, dependencies, callback);
        } else {
          var missingDependencies = [];
          
          dependencies.forEach(function (dependency) {
            if (!libraryStorage[dependency]) {
              missingDependencies.push(dependency);
            }
          });

          throw new Error(`Dependencies not available: ${missingDependencies.join(' ')}`);
        }
      }
      // load the library
      return libraryStorage[libraryName].library;
    }
  };

  window.librarySystem = librarySystem;
}());