function fib(n) {
    if(n <= 1) return 1;
    // fib calls itself recursively twice
    // this is called binary recursion
    return fib(n - 1) + fib(n - 2);
}

console.log(fib(2)); // 2
console.log(fib(3)); // 3
console.log(fib(4)); // 5
console.log(fib(5000)); // 8