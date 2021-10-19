// Use closure to remember first input so
// you can specify second input later

function makeAdder(x) {
    return function sum(y) {
        return x + y;
    }
}

let addTo5 = makeAdder(5)

console.log(addTo5(3))

// Remember functions via closure

// Formatter takes in a function and returns another
// function that accepts a string to format. In otherwords
// it stores and remembers the format function to use
function formatter(formatFn) {
    return function inner(str) {
        return formatFn(str)
    }
}

// Create and return a function for formatting to lowercase
const lower = formatter(function formatting(v) {
    return v.toLowerCase()
})

// Create and return a function for capitalizing the first letter
const capitalizeFirstLetter = formatter(function formatting(v) {
    return v[0].toUpperCase() + lower(v.substring(1))
})

console.log(lower('GreenWorD'))

console.log(capitalizeFirstLetter('masterByNight'))

console.log(lower.name) // inner

function ab() {}
console.log(ab.name) // ab

// Uses name inferencing to name anonymous functions
const kk = () => {}
console.log(`Name is ${kk.name}`) // kk

const gg = function(){}
console.log(`Name is ${gg.name}`) // gg

function w1() {return function () { throw Error('dk')}}
const p = w1()
console.log(`Name is ${p.name} with length ${p.name.length} and type ${typeof p.name}`)
// p()

// Don't trade ease of writing with pain of reading
// Arrow functions sometimes shift the cost from author to reader