const point = {
    x: 10,
    y: 12,
    z: 14
}

// represent point object as a closure 
// the values are stored individually and tracked via closure
function pt() {
    let x = 10;
    let y = 12;
    let z = 14;
    return function inner() {
        return [x, y, z];
    }
}
const p = pt();
console.log(p());
p()[0] = 9;
console.log(p())
const p2 = pt();
console.log(p2())