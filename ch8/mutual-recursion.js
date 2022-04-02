function isOdd(x) {
    if(x === 0) return false;
    return isEven(Math.abs(x-1));
}

function isEven(x) {
    if(x=== 0) return true;
    return isOdd(Math.abs(x-1));
}

console.log(isEven(52)); // true
console.log(isOdd(-174)); // false
console.log(isEven(11)); // false


// fibonacci using mutual recursion
function fib_(n) {
    if(n <= 1) return 1;
    return fib(n - 2);
}

function fib(n) {
    if(n <= 1) return 1;
    return fib(n - 1) + fib_(n);
}

console.log(fib(3)); // 3
console.log(fib(4)); // 5
console.log(fib(5)); // 8