// A home made library with helper functions for manipulating
// how we deal with function input.
// See: https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md

// All for one
// Helper function that ensures only one 
// argument is passed through to function fn .
// All other arguments will be ignored
function unary(fn) {
    return function onlyOneArgThrough(arg) {
        return fn(arg)
    }
}

function unaryUsage() {
    let k = ["0", "1", "2", "3", "4"].map(unary(parseInt))
    console.log(k)
    console.log(parseInt("2", 2, []))
}

// unaryUsage()

// One on One
// A function that takes one argument and does nothing but
// return the value untouched
function identity(v) {
    return v
}


function identityUsage() {
    // We want to split a string but the resulting array may have empty values in it
    let words = "   Now is   the time   for all ".split(/\s|\b/)
    // To discard these empty values we use filter(..)
    // console.log(words)
    // words = words.filter(Boolean)
    words = words.filter(identity)
    // console.log(words)

    // Using identity as a default function in place of a transformation
    function out(msg, formatFn = identity) {
        msg = formatFn(msg)
        console.log(msg)
    }
    function upper(txt) { return txt.toUpperCase() }
    out('Greenland')
    out('Moses', upper)
}
// identityUsage()

// Unchanging One
// A function that returns a function that returns the value unchanged.
function constant(v) {
    return function value() {
        return v
    }
}

function constantUsage() {
    let p1 = Promise.resolve(5), p2 = Promise.resolve(19)
    p1.then(constant(p2)).then(v => console.log('v is', v))
    console.log(constant(7)())
}
// constantUsage()

// Adapting arguments to parameters
// 1. A function that spreads out a single received array as 
// its individual arguments and returns a function that calls
// the given function with the arguments to spread out supplied as an array.
// This function is sometimes called apply
// spreadArgs takes in a function that expects arguments already spread.
// It returns a function that accepts an array of arguments.
// spreadArgs adapts fn to work with (or be called by) another function that provides an array as a single argument.
function spreadArgs(fn) {
    return function spreadFn(argArr) {
        return fn(...argArr)
    }
} 
function spreadArgsUsage() {
    function bar(x, y, z) { console.log(x + y + z) }
    function foo(fn) { return fn([1, 2, 3]) }

    // We use spreadArgs to addapt bar to work with foo
    foo(spreadArgs(bar))
}
// spreadArgsUsage()

// 2. A function that gathers multiple arguments into a single array
// Takes in a function that expects an array as the single argument.
// Produces a function that accepts multiple arguments.
// This function adapts a function that expects an array as the only argument to be called by 
// a function that provides multiple arguments.
// Sometimes this function is called unapply
function gatherArgs(fn) {
    return function gatherFn(...argsArr) {
        return fn(argsArr)
    }
}

function gatherArgsUsage() {
    function f1(arr) { 
        let sum = 0; arr.forEach(v => sum += v)
        console.log(sum)
    }
    function f2(fn) { return fn(1, 2, 3, 4) }

    // Arguments provided by f2 are gathered by
    // gatherArgs() and passed to f1 as a single array
    f2(gatherArgs(f1))
}
// gatherArgsUsage()

// Some Now, Some Later

// Partial application
// Partial application is a reduction in a 
// function's arity. Arity is the number of expected
// parameter inputs.
// Partial function works like this: I have this function fn
// and I have to pass in these many arguments, but I would like to
// pass in only a few right now, so allow me to give you the few I have,
// Pass them in for me and return me a function that I can use to pass in
// the remaining arguments later.
function partial(fn, ...presetArgs) {
    // Inner function partiallyAppliedFn(..) closes over
    // partial's parameters ie. fn and presetArgs so it
    // can keep accessing them later no matter where the function
    // runs.
    return function partiallyAppliedFn(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function partialUsage(){ 
    function f1(a, b, c, d, e) { console.log(a + b + c + d + e); };
    const f2 = partial(f1, 1)
    const f3 = partial(f2, 2)
    const f4 = partial(f3, 3, 4)
    f4(5)

    // Add 5
    function add(x, y) { return x + y }
    let arr2 = [1, 2, 3, 4].map(partial(add, 5))
    console.log(arr2) // 6, 7, 8, 9
}

// partialUsage()

// Reverse arguments
// Function that wraps a function to reverse its argument order
// Produces a function that expects arguments to be given to it
// in reverse order
function reverseArgs(fn) {
    return function argsReversedFn(...args) {
        return fn(...args.reverse())
    }
}

function reverseArgsUsage(){
    // Reverse order of arguments
    function diff(a, b, c, d) { return a - b - c - d; }
    console.log(diff(1, 2, 3, 4))
    const diffReversedArgs = reverseArgs(diff)
    console.log(diffReversedArgs(4, 3, 2, 1))
    const difRevPart = partial(diffReversedArgs, 4, 3)
    console.log(difRevPart(2, 1))   
}
// reverseArgsUsage()

// Partially apply right most arguments.
// The remaining arguments should also be specified right to left
// Note that partial right only guarantees that the presetArgs will be
// last arguments passed to the function, not that they will map to the 
// last parameters.
function partialRight1(fn, ...presetArgs) {
    // We provide the first batch of arguments to apply
    // Outer reverseArgs is to reverse arguments order for laterArgs
    return reverseArgs(
        partial(reverseArgs(fn), ...presetArgs.reverse())
    )
}

// Partially apply right most arguments. Alternative implementation.
// Note that right most does not mean arguments for last parameters.
// The right most means right most relative to other passed in arguments. 
function partialRight(fn, ...presetArgs) {
    return function partiallyAppliedRight(...laterArgs) {
        return fn(...laterArgs, ...presetArgs)
    }
}

function partialRightUsage() {
    function f1(a, b, c, d) { return ((a - b) * c) + d  }
    const p1 = partialRight(f1, 2, 3)
    console.log(p1(1, 0)) // expect: ((1 - 0) * 2) + 3) = 5

    // There is no guarantee that the last parameters will have values
    // passed to them 
    // Miss out some
    function f2(w, x, y, z, ...rest) {
        console.log(w, x, y, z, rest)
    }
    let f = partialRight(f2, 'z:last')
    f(1, 2) // 1 2 'z:last' undefined []
    f(1)
    f(1,2,3)
    f(1,2,3,4)
    f(1,2,3,4,5)
}
// partialRightUsage()

// One at a time
// Currying. This is a technique where a function that
// expects multiple arguments is broken down into 
// successive chained functions that each take a single 
// argument (arity: 1) and return another function to 
// accept the next argument.
// Currying unwinds a single higher-arity function into
// a series of chained unary functions.
function curry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {
        return function curried(nextArg) {
            let args = [...prevArgs, nextArg]
            if(args.length >= arity) {
                return spreadArgs(fn)(args)
            }
            else {
                return nextCurried(args)
            }
        }
    })([])
}
  
const curryArrow = 
    (fn, arity = fn.length, nextCurried) =>
        (nextCurried = prevArgs =>
            nextArg => {
                // Add received arg to args collection
                let args = [...prevArgs, nextArg]
                if(args.length >= arity) {
                    // We have nough args, execute
                    return fn(...args)
                } 
                else {
                    // Return another curried function to
                    // collect the next arg
                    return nextCurried(args)
                }
            }
        )([])

        
function curryUsage() {
    function f1(a, b, c) { console.log(a + b + c) }
    const curriedF1 = curry(f1)
    const c1 = curriedF1(1)
    console.log(typeof c1)
    const c2 = c1(2)
    console.log(typeof c2)
    const c3 = c2(3)
    console.log(typeof c3) // undefined 
    curryArrow(f1)(3)(1)(5) // 9

    // Add
    const add = (a, b) => a + b
    let arr = [1, 2, 3, 4].map(curry(add)(2)) 
    console.log(arr) // [3, 4, 5, 6]

    // Sum
    const sum = (...args) => {
        let total = 0;
        for(let num of args) 
            total += num;
        return total;
    }
    console.log(curry(sum, 4)(1)(2)(3)(4)) // 10

}
// curryUsage()

// Currying multiple arguments at once
function looseCurry(fn, arity = fn.length) {
    return (function nextCurried(prevArgs) {
        return function curried(...nextArgs) {
            const args = [...prevArgs, ...nextArgs]
            if(args.length >= arity) {
                return fn(...args)
            }
            else {
                return nextCurried(args)
            }
        }
    })([])
}

const looseCurryArrow = 
    (fn, arity = fn.length, nextCurried) =>
   // Define nextCurried function
    (nextCurried = prevArgs => 
        // Define curried function
        (...nextArgs) => {
            const args = [...prevArgs, ...nextArgs]
            // We use >= because someone may supply extra args
            if(args.length >= arity) {
                return fn(...args)
            }
            else {
                return nextCurried(args)
            }
        }
    )([])


function looseCurryUsage() {
    const f1 = (a, b, c, d, e) => a + b + c + d + e 
    const res = looseCurry(f1)(1, 2, 3)(4)(5)
    console.log(res)
    const res2 = looseCurryArrow(f1)(2, 3)(1)(4, 8, 0, 5)
    console.log(res2)
}
// looseCurryUsage()

// No Curry for Me, Please
// Uncurry a curried function. eg f(1)(2)(3) to g(1,2,3)
// Produces a function that accepts multiple arguments that can
// be passed in all at once.
// Note. If you pass in less arguments that is expected by the 
// curried function you'll get a partially curried function as the result.
function uncurry(fn) {
    return function uncurried(...args) {
        let ret = fn 
        // We call the curried function passing in our arguments one at a time
        for(let arg of args) {
            ret = ret(arg)
        }
        return ret;
    }
}

const uncurryArrow 
    = fn =>
        (...args) => {
            let ret = fn 
            // We call the curried function passing in our arguments one at a time
            for(let arg of args) {
                ret = ret(arg)
            }
            return ret;
        }

function uncurryUsage() {
    function sum(...nums) {
        let sum = 0; 
        for (let num of nums) {
            sum += num
        }
        return sum;
    }
    let curriedSum = curry(sum, 4)
    let uncurriedSum = uncurry(curriedSum)
    console.log(uncurriedSum(1,2,3,4))
    // Pass in less arguments
    let uncurried2 = uncurry(curriedSum)
    const un3 = uncurried2(1, 2)
    console.log(un3) // partially curried function
    console.log(un3(3)(4))

}   
// uncurryUsage()     

// Order Matters
// Use named arguments when providing arguments for partial function
function partialProps(fn, presetArgsObj) {
    return function partiallyAppliedProps(laterArgsObj) {
        return fn(Object.assign({}, presetArgsObj, laterArgsObj))
    }
}

// arity determines how many arguments we are to pass in 
// If they dont provide arity, we assume the argument object fn
// expects will have only one property.
function curryProps(fn, arity = 1) {
    return (function nextCurried(prevArgObj) {
        return function curried(nextArgObj = {}) {
            // We take the first property only. 
            let [key] = Object.keys(nextArgObj)
            const argObj = Object.assign(
                {}, prevArgObj, { [key]: nextArgObj[key] })

               
            if(Object.keys(argObj).length >= arity) {
                return fn(argObj)
            }
            else {
                return nextCurried(argObj)
            }
        }
    })({})
}

function propsUsage() {
    function f1({ x, y, z}) {
        console.log(`x is ${x}, y is ${y}, z is ${ z }`)
    }
    let p1 = partialProps(f1, { x: 3, z: 1 })
    p1({ y: 4 })

    let c1 = curryProps(f1, 3)
    let c2 = c1({ x: 2 })
    let c3  = c2({ z: 3 })
    c3({ y: 5 })
}
// propsUsage()

function spreadArgProps(
    fn,
    propOrder =
        fn.toString().replace(/^(?:(?:function.*\(([^]*?)\))|(?:([^\(\)]+?)\s*=>)|(?:\(([^]*?)\)\s*=>))[^]+$/, "$1$2$3" ).split( /\s*,\s*/ ).map( v => v.replace( /[=\s].*$/, "" ) )
) {
    return function spreadFn(argsObj){
        console.log('prop order', propOrder)
        return fn( ...propOrder.map( k => argsObj[k] ) );
    };
}

// Not working properly. Buggy
function spreadArgPropsUsage() {
    function f1(a, b, c) { console.log(a + (b * c) ) }
    const spread1 = spreadArgProps(f1)
    spread1({ c: 3, a: 4, b: 2 })
}

// spreadArgPropsUsage()

// No points.
function double(v) { return v * 2 }

// mapper function unnecessary. We can simply with point-free style
// The point v maps to the argument in double()
let k = [1,2,3,4].map(function mapper(v) { return double(v) })
// console.log(k)

// point-free style / tacit programming
let g = [1,2,3].map(double)
// console.log(g)

// Negation helper
// Sometimes called complement
// Returns a function that if invoked will return the negation
// of the predicate when called.
const not =
    predicate =>
        (...args) =>
            !predicate(...args)

function notUsage() {
    const printIf = (predicate, msg) => { 
        if(predicate(msg)) {
            console.log(msg)
        }
    }
    const isShortEnough = str => str.length <= 5

    printIf(isShortEnough, 'Cowdung')
    printIf(isShortEnough, 'ajax')

    // is long enough
    const isLongEnough = not(isShortEnough)

    printIf(isLongEnough, 'ab')
    printIf(isLongEnough, 'Thomason')


}

// notUsage()         

// When
// We can use a when utility to express the if conditional part
const when =
    (predicate, fn) =>
        (...args) => 
            predicate(...args) ? fn(...args) : undefined


function whenUsage() {
    // convenience to avoid potential binding issue with trying
    // to use console.log as a function
    const output = txt => console.log(txt)

    // create a function that expects two predicate and txt arguments together, 
    // ie. printf(predicate, str)
    const printIf = uncurry(partialRight(when, output))

    let msg = 'Hello';
    let msg2 = 'Green Basket'

    const isLongEnough = (str, len) => str.length > len
    const isShortEnough = (str, len) => not(isLongEnough)(str, len)

    // These expect a string argument
    const isLong5 = partialRight(isLongEnough, 5)
    const isShort5 = not(isLong5)

    printIf(isLong5, msg)
    printIf(isLong5, msg2)

    console.log('**is short enough **')
    printIf(partialRight(isShortEnough, 3), msg)
    printIf(partialRight(isShortEnough, 3), 'Me')

    when(constant(5 > 3), () => console.log('Greater'))()

}

whenUsage()