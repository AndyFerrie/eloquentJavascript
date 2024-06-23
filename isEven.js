function isEven(n) {
    if (n < 0) {
        throw new Error("Please enter a positive number");
    }
    
    if (n === 0) {
        return true;
    }
    
    if (n === 1) {
        return false;
    }
    console.log(n)
    return isEven(n - 2);
}

console.log(isEven(75))