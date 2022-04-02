function isPrime(num, divisor = 2) {
    if(num < 2 || (num > 2 && num % divisor === 0)) {
        return false;
    }
    if(divisor <= Math.sqrt(num)) {
        return isPrime(num, divisor + 1);
    }
    return true;
}

console.log(isPrime(57)); // false
console.log(isPrime(101)); // true
console.log(isPrime(533)); // ?
console.log(isPrime(121)); // false