'use strict'
// proper tail calls (PTC)
function isOdd(x) {
    'use strict'
    if(x === 0) return false;
    return isEven(Math.abs(x-1));
}

function isEven(x) {
    'use strict'
    if(x=== 0) return true;
    return isOdd(Math.abs(x-1));
}

// console.log(isEven(9_663)); // true

// Optimizing sum

// original sum1 that doesnt use ptc
function sum1(num1, ...nums) {
    if(nums.length === 0) return num1;
    return num1 + sum1(...nums);
}
const arr = Array(400).fill(10);
// console.time()
// console.log(sum1(...arr));
// console.timeEnd();


// optimized sum2
function sum2(result, num1, ...nums) {
    if(nums.length === 0) return result + num1;
    return sum2(result + num1, ...nums);
}
console.time();
console.log(sum2(...arr))
console.timeEnd();