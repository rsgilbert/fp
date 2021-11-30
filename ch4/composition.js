const { not, partialRight, reverseArgs } = require("../ch3/func-inputs")

// Splits a string into an array of words.
function words(str) {
    return String(str)
        .toLowerCase()
        .split(/\s|\b/)
        .filter(function alpha(v) {
            return /^[\w]+$/.test(v)
        })
}

// Takes a list and filters it not to have any repeated values
function unique(list) {
    let uniqList = []
    for(let v of list) {
        // check if value not yet in the new list
        if(!~uniqList.indexOf(v)) {
            uniqList.push(v)
        }
    }
    return uniqList
}

// Use these two utilities to analyze a string of text
let text = "To to compose two two two functions together, pass the \
    output of the first function call as the input of the \
    second function call.";

// console.log('text', text)
let wordsFounds = words(text);
// console.log('words found', wordsFounds)

let wordsUsed = unique(wordsFounds)
// console.log('words used', wordsUsed)

let w = unique(words(text))
// console.log(w)

function uniqueWords(str) {
    return unique(words(str))
}

// console.log(uniqueWords(text))

const compose2 = 
    (fn2, fn1) =>
        origValue =>
            // The functions compose from right to left
            // ie. The execution order is right to left but code order is left to right
            fn2(fn1(origValue))

const uniqW = compose2(unique, words)
// console.log(uniqW(text))

const letters = compose2(words, unique)
let txt = "How are you dear?"
// let chars = letters(txt)
// console.log(chars)
// console.log(unique(txt))
// console.log([1,2].toString().split(/\s/))


// Not the best impl bse it takes one arg
// Compose multiple functions.
// fns is a collected array of arguments.
const compose12 = 
    (...fns) => 
        result => {
            // Make a compy of the fns array so that
            // the compose function can reliably be used more than once
            let list = [...fns]
            while(list.length > 0) {
                result = list.pop()(result)
            }
            return result
        }

function skipShortWords(words) {
    let filteredWords = []
    for(let word of words) {
        if(word.length > 4) {
            filteredWords.push(word)
        }
    }
    return filteredWords
}

function showBigWords(text) {
    let biggerWordsFn = compose12(skipShortWords, unique, words)
    let results = biggerWordsFn(text)
    console.log(results)
}
// showBigWords('This is my my great great tie tie in in in in heaven heaven')

function showShortWords() {
    const isShort = str => str.length <= 2
    const shortWords = words => words.filter(isShort)
    const isLong = not(isShort)
    const longWords = words => words.filter(isLong)

    const filterWords = partialRight(compose12, unique, words)
    let shortResult = filterWords(shortWords)
    let longResult = filterWords(longWords)

    let txt = 'This is sth beautiful is a very is a nice thing'
    console.log('short', shortResult(txt))
    console.log('long', longResult(txt))   
}
// showShortWords()


// Implementation of compose using reduce
// Reduces from right to left
// Reduce runs everytime you call the composed function.
const compose3 = (...fns) =>
    result => 
        [...fns].reverse().reduce(
            (result, fn) => fn(result),
            result
        )


// Best implementation. 
// Can take multiple arguments.
// Compose 4 that supports multiple arguments to first call
// Runs the reduce looping once up front at composition time
// but defers the function call calculations - refered to as lazy calculation.
// Reduce runs once and at the point of creating the composed function.
const compose = (...fns) =>
    // Result of the reduce call is a function
    fns.reverse().reduce( (fn1, fn2) => 
        (...args) => 
            fn2(fn1(...args)))

function compose4Usage() {
    const f1 = (a, b) => a + b
    const f2 = a => a * 2
    const f3 = a => a - 3

    const c = compose(f3, f2, f1)
    console.log(c(2, 3)) // 7
    const c2 = compose3(f3, f2)
    console.log(c2(4)) // 5
    const c3 = compose(f3, f2)
    console.log(c3(2)) // 1
    console.log(c(3, 5)) // 13
}
// compose4Usage()


// Compose using recursion
// Define compose function using recursion
// Easier to think about.
const composeRecur = (...fns) => {
    const [ fn1, fn2, ...rest ] = fns.reverse()

    // Return same first function if only one argument in ...fns
    if(fn2 === undefined) return fn1

    // create a function that is composed of two functions
    const composedFn = (...args) => fn2(fn1(...args))

    if(rest.length === 0) return composedFn
    return composeRecur( ...rest.reverse(), composedFn )
}

function composeRecurUsage() {
    const f1 = (a, b) => a + b
    const f2 = a => a * 2
    const f3 = a => a - 3

    const c = composeRecur(f3, f2, f1)
    console.log(c(3, 4)) // 11
    console.log(c(2, 3)) // 7
    
    const c2 = composeRecur(f3, f1)
    console.log(c2(1,2)) // 0

    const c3 = composeRecur(f2, f3)
    console.log(c3(4)) // 2

    const c4 = composeRecur(f2)
    console.log('c4', c4(4)) // 8

}
composeRecurUsage()

// pipe
// Implement pipe using reduce
const pipe = (...fns) => 
    fns.reduce((fn1, fn2) => 
        (...args) => 
            fn2(fn1(...args)))


// Implement pipe using recursion
// Specify arguments (functions) left to right
const pipeRecur = (...fns) => {
    const [ fn1, fn2, ...rest ] = fns

    // Incase the pipe had only one argument, fn2 will be undefined
    if(fn2 === undefined) return fn1

    const composedFn = (...args) => fn2(fn1(...args))

    if(rest.length === 0) return composedFn 
    return pipeRecur( composedFn, ...rest )
}


// Implement pipe using reverseArgs
const pipe1 = reverseArgs(compose)


function pipeUsage() {
    const f1 = (a, b) => a + b
    const f2 = a => a * 2
    const f3 = a => a - 3

    const p = pipe(f1, f2, f3)
    console.log(p(2, 3)) // 7

    const pR = pipeRecur(f1, f2, f3)
    console.log(pR(1, 2)) // 3

    const pRev = pipe1(f1, f3, f2)
    console.log(pRev(3, 4)) // 8
}
pipeUsage()

// abstraction
function storeData(store, location, value) {
    store[location] = value;
}

let comments = []

const saveCmt = txt => storeData(comments, comments.length, txt)

const events = {}

const trackEvt = evt => storeData(events, evt.name, evt)