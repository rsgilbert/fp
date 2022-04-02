// Find highest even number

// using loop
function maxEven(...nums) {
    let highest = -Infinity;
    for(let n of nums) {
        if(n > highest && n % 2 === 0) {
            highest = n;
        }
    }
    return highest;
}

// console.log(maxEven(-5, 2, -8, 30, 11, 4)) // 30
// console.log(maxEven(1))

// using recursion
function maxEvenRecur(n1, ...nums) {
    console.log(n1, nums)
    if(nums.length === 1) {
        return maxEv(n1, nums[0])
    }
    return maxEv(n1, maxEvenRecur(...nums));

    // ****
    function maxEv(n1, n2) {
        console.log(n1, n2)
        if(n2 % 2 === 0) {
            if(n1 % 2 == 0) return Math.max(n1, n2);
            return n2;
        }
        return n1;
    }
}
// console.log(maxEvenRecur(2, -6, 3, 7, 0))
// console.log(maxEvenRecur(0, 5, 8, 2, 6))


function maxEvenRecur2(num1, ...restNums) {
    // console.log(num1, restNums)
    let maxRest = restNums.length > 0 ? maxEvenRecur2(...restNums) : undefined;
    if(num1 % 2 == 0) {
        if(maxRest === undefined) return num1;
        return num1 > maxRest ? num1 : maxRest; 
    }
    return maxRest;
}

console.log(maxEvenRecur2(2, -14, 4, 3, 3, 9, 0, 2))
console.log(maxEvenRecur2(5, 7, 3))
console.log(maxEvenRecur2(3))
console.log(maxEvenRecur2())
console.log(maxEvenRecur2(-8))