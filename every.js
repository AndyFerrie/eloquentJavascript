function every(array, test) {
  for (let element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

function every2(array, test) {
  return !array.some(test);
}

console.log(every2([1, 2, 11, 4], (n) => n < 10));
