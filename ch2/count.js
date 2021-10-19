function f1(w, x, y, z) {} 
console.log(f1.length) // 4

function f2(a, b = 10) {}
console.log(f2.length) // 1

function f3(a, b, c, ...args) {
    console.log('f3 has', f3.length, 'parameters')
}

console.log(f3.length)
f3()


function f4(x, y, z) {
    console.log('arguments length is', arguments.length, 'they are', arguments)
}

f4(1)


function f5(a, b, ...args) {
    console.log('args', args)
}

f5(1, 2, 3, 4, 5)
f5(...[1, 5, 10, 15, 25])


// Destructuring
// A way to declare a pattern for the kind of structure
// (object, array etc) that you expect to see and how
// its decomposition should be processed.
// This is declarative
function f6([a, b, ...args]) {
    // args is the rest element
    console.log('a is', a, 'b is', b, 'args', args)
}

f6([1, 2, 3, 4, 5 ,6])

function f7( { a, b }) {
    console.log('a is', a, 'b is', b) 
}

f7({ a: 2, b: 10 })

const [a, b] = [1, 2]
console.log(a, b)