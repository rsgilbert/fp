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
// its individual arguments
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
gatherArgsUsage()

// Some Now, Some Later
