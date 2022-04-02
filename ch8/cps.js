// Continuation passing style
function identity(x) { return x; }

// doesnt work
// function fib(n, cont = identity) {
//     if(n <= 1) return cont(n);
//     return fib(n - 2,
//         n2  => fib(n-1, 
//             n1 => cont(n2 + n1)));
// }

// console.log(fib(2)); // 2
// console.log(fib(3)); // 3
// console.log(fib(4)); // 5

function f1(){ }
console.log(typeof f1)
const a = () => null;
console.log(typeof a)