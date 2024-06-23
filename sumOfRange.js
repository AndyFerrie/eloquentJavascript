function range(start, end, step = 1) {
    const result = [];
    const direction = step > 0 ? 1 : -1;

    for (let i = start; direction * (i - end) <= 0; i += step) {
        console.log(direction * (i - end))
        result.push(i);
    }

    return result;
}

function sumOfRange(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumOfRange(range(50, 200)));