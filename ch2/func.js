function foo(x, y = 5, b) {
    console.log('sum of', x, 'and', y, 'is', x + y)
    console.log('b is', b)
}

let a = 3;
foo(a, a * 2)

foo(3)

foo(2,undefined)
foo(1, null)

foo(1, undefined, 15)

console.log(8 + null + 1 + null + 1)
console.log(Number(null))
console.log(Number(undefined))