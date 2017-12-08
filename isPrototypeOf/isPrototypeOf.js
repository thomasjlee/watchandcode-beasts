function isPrototypeOf(prototypeObj, object) {
  // error case: If first arg is null or undefined, throw TypeError.
  if (!prototypeObj) {
    throw new TypeError(`prototypeObj cannot be ${prototypeObj}`);
  }

  // base case 1: If object is null or undefined, either
    // inputs were invalid or we've reached the end of the chain.
    // Return false.
  if (!object || typeof object !== 'object') {
    return false;

  // base case 2: If the prototype is successfully matched, return true;
  } else if (prototypeObj === Object.getPrototypeOf(object)) {
    return true;

  // recursive case: See if there's a matching prototype higher up the chain.
  } else {
    return isPrototypeOf(prototypeObj, Object.getPrototypeOf(object));
  }
};
