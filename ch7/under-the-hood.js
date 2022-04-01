///// Read this! 
///// This is the clearest definition of the concept behind closures
function outer() {
    let x = 2;
    let y = 4;

    return function inner() {
        let z = 10;
        return [x, y, z]
    }
}

// Representation under the hood 
let scopeOfOuter = {
    x: 2, y: 4
}

let scopeOfInner = { z: 10 }

Object.setPrototypeOf(scopeOfInner, scopeOfOuter);

// referencing non-local variables from function inner() 
console.log(scopeOfInner.x, scopeOfInner.y)
// referencing local variables from function inner
console.log(scopeOfInner.z)