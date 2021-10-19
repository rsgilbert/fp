// this provides an object context for the
// function to run against
// this is an implicit parameter for a function
function sum() {
    console.log('this is', this)
    return this.x + this.y
}

const context = { x: 2, y: 5 }

console.log(sum.call(context))

context.sum = sum 

console.log(context.sum())

const s2 = sum.bind(context)
console.log(s2())