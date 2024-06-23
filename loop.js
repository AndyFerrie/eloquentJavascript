function loop(value, test, update, body) {
    while (test(value)) {
        body(value);
        value = update(value);
    }
}

// Example usage:
loop(
    0, // Initial value
    n => n < 10, // Test function
    n => n + 1, // Update function
    n => console.log(n) // Body function
);