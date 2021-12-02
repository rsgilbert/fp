// A pure function is a function with no side causes/effects.
// A pure function is idempotent (in the programming sense) because it can not have any side effects
// and is not influenced by side causes.
// Calling a pure function multiple times is indistinguishable from calling it once.
// See: https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch5.md/#chapter-1-why-functional-programming
function add(x, y) {
    return x + y;
}

// A pure function can reference free variables as 
// long as those variables aren't side causes - In otherwords
// the implementation does not rely on their current state at a particular point in time or their
// possibility to change.

// For pure functions, given the same input, it always gives the 
// same output.

const PI = 3.141;

// pure
function circleArea(radius) {
    return PI * radius * radius;
}

// pure
function cylinderVolume(radius, length) {
    return length * circleArea(radius)
}

// console.log(cylinderVolume(3, 5))

// purely relative
function rememberNumber(nums) {
    return function caller(fn) {
        return fn(nums)
    }
}

let list = [1,2,3,4,5]
let simpleList = rememberNumber(list)
// simpleList(console.log)
 
function median(nums) {
    return (nums[0] + nums[nums.length - 1]) / 2;
}

// simpleList is pure for a given set of assumptions.
// Its pure in any program that didnt have the list.push(6) mutation.
// console.log(simpleList(median))
// list.push(6)
// console.log(simpleList(median))

// We can guard against this impurity by modifying rememberNumbers

function rememberNumbers2(nums) {
    // console.log(nums[0])
    // console.log(Object.getOwnPropertyDescriptor(nums,0))
    // nums[0] = 42
    // console.log(Object.getOwnPropertyDescriptor(nums,0))
    nums = [...nums]
    // console.log(nums)
    // console.log(nums[0])
    // console.log(Object.getOwnPropertyDescriptor(nums,0))
    return function caller(fn) {
        return fn(nums)
    }
}



let l2 = [3,4,5]
simpleList = rememberNumbers2(l2)
// console.log(simpleList(median))
l2.push(6)
// Still prints 4
// console.log(simpleList(median))

Object.defineProperty(
    l2,
    0,
    {
        get: function() {
            //console.log('[0] was accessed')
            return 500
        }
    }
)

// simpleList = rememberNumbers2(l2)
// console.log(simpleList(median)) 

// Change signature of remberNums to receive numbers as 
// individual arguments
function rememberNums(...nums) {
    return function caller(fn) {
        return fn(nums)
    }
}
// both fns are now pure
let sList = rememberNums(...l2)
l2.push(438)
// console.log(sList(median))

let l = [1,2]
l2 = l.reverse()
// console.log('l2', l2)
// console.log('l', l)


// pure fn
function firstV(l) { return l[0] }

// impure fn
function lastV(l) { return firstV(l.reverse()) }

let a1 = [1,2,3]
// console.log(lastV(a1))
// a1 has been mutated (reversed)
// console.log(a1)


// let a2 = [10, 23, 50]
// let aList = rememberNums(...a2)
// // fn mutates its closed over nums via reference
// console.log(aList(lastV))
// console.log(aList(lastV))

// Guards agains fn mutating its closed over nums

// Change signature of remberNums to receive numbers as 
// individual arguments
function remNums(...nums) {
    return function caller(fn) {
        return fn([...nums])
    }
}
let a2 = [10, 23, 50]
let aList = remNums(...a2)
console.log(aList(lastV))
console.log(aList(lastV))

// pure fn + impure fn = impure fn
aList(function impureIO(nums) { console.log(nums.length)})