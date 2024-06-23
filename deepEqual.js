function deepEqual(val1, val2) {
  // Check if both values are strictly equal
  if (val1 === val2) {
    return true;
  }

  // Check if either value is null or not an object
  if (val1 === null || typeof val1 !== "object" ||
      val2 === null || typeof val2 !== "object") {
    return false;
  }

  // Get the keys of both objects
  let keys1 = Object.keys(val1);
  let keys2 = Object.keys(val2);

  // Check if both objects have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all keys and their values are equal recursively
  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(val1[key], val2[key])) {
      return false;
    }
  }

  // If all keys and their values are equal
  return true;
}

// Example usage:
console.log(deepEqual({a: 1, b: {c: 3}}, {a: 1, b: {c: 3}})); // true
console.log(deepEqual({a: 1, b: {c: 3}}, {a: 1, b: {c: 4}})); // false
console.log(deepEqual({a: 1, b: {c: 3}}, {a: 1, b: {d: 3}})); // false
console.log(deepEqual(null, {a: 1})); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(1, "1")); // false
console.log(deepEqual(1, 1)); // true