// Referential Transparency
// Assertion that a function call could be 
// replaced by its output value and the overall
// program behavior wouldn't change.

// calcAverage has referential transparency and is thus a pure function.
function calcAverage(nums) {
    let sum = 0;
    for(let num of nums) {
        sum += num;
    }
    return sum / nums.length;
}

// let nums = [1,2,3,5,6,9]
let nums = [2,4,6]
let avg = calcAverage(nums);
// console.log('Average', avg)

// OR, inline avg value
nums = [2, 4, 6]
avg = 4
// console.log('Average', avg)

// calcAverage has referential transparency and is thus a pure function.
function calcAverage2(nums) {
    sum = 0;
    for(let num of nums) {
        sum += num;
    }
    return sum / nums.length;
}

// sum is an outer free variable
let sum;
avg = calcAverage2(nums)
// console.log('av2', avg)
// console.log('sum', sum)

// Performance effects.
// Reducing side causes/effects means designing a program where few
// side causes/effects are possible.
// memoization
let specialNum = (function memoization() {
    let cache = {}
    return function specialNum(n) {
        if(cache[n]) {
            console.log('found in cache')
            return cache[n]
        }
        console.log('Not in cache, computing')
        cache[n] = n * n 
        return cache[n]
    }
})() 

// console.log(specialNum(5))
// console.log(specialNum(10))
// console.log(specialNum(5))
// console.log(specialNum(7))


// Purifying
function addMaxNum(arr) {
    let maxNum = Math.max(...arr)
    arr.push(maxNum + 1)
}

let ar1 = [4, 6, 1]
addMaxNum(ar1)
// console.log(ar1)

// purify addMaxNum by returning the max num instead of 
// pushing it into the array
function addMaxNum2(arr) {
    return Math.max(...arr) + 1;
}

ar1.push(addMaxNum2(ar1))
// console.log(ar1)

// Containing effects
let users = {}
function fetchUserData(userId) {
    setTimeout(() => {
        users[userId] = 'banana'
    }, 10)
}

// More bure but not strictly pure because it still
// relies on the IO of making an ajax call (in our code we replaced it with setTimout but its supposed to be ajax)
// Note: function purity only need be skin deep - that is, on the surface. The purity of a fn is judged from the outside. 
function safer_fetchUserData(userId, users) {
    users = Object.assign({}, users);
    fetchUserData(userId);
    return users;

    // original untouched impure fn
    function fetchUserData(userId) {
        setTimeout(() => {
            users[userId] = 'banana'
        }, 10)
    }

}

// Covering up effects
 nums = []
var smallCount = 0
var largeCount = 0

function generateMoreRandoms(count) {
    for(let i = 0; i < count; i++) {
        let num = Math.random();
        if(num >= 0.5) {
            largeCount++;
        }
        else {
            smallCount++;
        }
        nums.push(num)
    }
}
generateMoreRandoms(5)
// console.log(nums)
// console.log('large count', largeCount)
// console.log('small count', smallCount)

// Quarantine the side causes/effect
// 1. Capture to be affected current states
// 2. Set initial input states
// 3. Run the impure function 
// 4. Capture the side-effect states
// 5. Restore original states
// 6. Return the captured side effect states.

function safer_generateMoreRandoms(count) {
    // capture affected current states
    let nums_orig = [...nums];
    let smallCount_orig = smallCount
    let largeCount_orig = largeCount;

    // initialize input states
    nums = []
    smallCount =0;
    largeCount = 0;
    
    // run impure
    generateMoreRandoms(count);

    // save result
    let result = { 
        nums: [...nums], smallCount, largeCount
    }

    // restore
    nums = [...nums_orig]
    smallCount = smallCount_orig
    largeCount = largeCount_orig

    // return
    return result;
}

nums = [1, 2]
smallCount = 5;
largeCount = 3;

const res = safer_generateMoreRandoms(3)
// console.log('res', res)
// console.log('orig', nums, smallCount, largeCount)


// Evading effects
function handleInactiveUsers(userList) {
    userList[0].name = 'tony'
}

let u = [
    {
        name: 'Simon'
    }
]

// shallow copy wont help
handleInactiveUsers([...u])
// console.log(u)

// do a deep copy

function safe_handleInactiveUsers(userList) {
    let copiedUserList = userList.map(u => Object.assign({}, u))
    handleInactiveUsers(copiedUserList)
    return copiedUserList
}

let u1 = [{ name : 'Mark' }]
let r1 = safe_handleInactiveUsers(u1)
// console.log(u1) // mark
// console.log(r1) // tony

// this revisited
// this-aware funcions have `this` as implicit input
let ids = {
    prefix: '_',
    generate() {
        return this.prefix + Math.random()
    }
}

// console.log(ids.generate())

// make `this` an explicit parameter 
function safer_generate(context) {
    return ids.generate.call(context)
}

const ctx = { prefix: 'Museveni_' }
console.log(safer_generate(ctx))

