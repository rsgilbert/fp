// treat all received values as immutable to avoid side-effect
function updateName(rec, name) {
    rec = Object.assign({}, rec);
    rec.name = name;
    return rec;
}

const r = { name: 'Tim',age: 10 }
const r2 = updateName(r, 'Jane')
console.log(r, r2)


let a1 = [1, 2, 3]
let a2 = a1.slice(1);
let a3 = a1.concat(8);
console.log(a1, a2, a3);

let a = [1,2,3]
a.fill(10);
console.log(a)

// using an impure function
function myFill(arr, fillNum) {
    // always treat received values as immutable
    arr = [...arr];
    arr.fill(fillNum)
    return arr;
}

let a4 = [5, 10, {a: 4}, true]
let a5 = myFill(a4, 5);
console.log(a4, a5)