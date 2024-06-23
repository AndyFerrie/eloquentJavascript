function reverseArray(array) {
    const reversedArray = []
    for (let i = 0; i < array.length; i++) {
        reversedArray.unshift(array[i])
    }
    return reversedArray
}

function reverseArrayInPlace(array) {
    const reversedArray = reverseArray(array)
    for (let i = 0; i < array.length; i++) {
        array[i] = reversedArray[i]
    } 
    return array
}

console.log(reverseArrayInPlace([1, 2, 3, 4]))