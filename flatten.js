function flatten(arrays) {
    return arrays.reduce((flattenedArray, array) => flattenedArray.concat(array), [])
}

console.log(flatten([[1, 2], [3, 4]]))