  'use strict'
function sum(total, ...nums){ // first arg is used as the acumulator
    for(let num of nums) {
        total += num;
    }
    return total;
}


// console.log(sum(2, 4, 5, 1)) // 12

// using recursion
// FPers avoid reassignment of local variables wherever possible 
function sum2(num1, ...nums) {
    if(nums.length === 0) return num1;
    return num1 + sum2(...nums);
}

const arr = Array(490).fill(30);
// console.log(arr)
console.log(sum2(...arr)); // 26
// console.log(sum2())