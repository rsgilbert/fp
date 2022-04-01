// A constant is a variable which once assigned a value
// can not be reassigned another value.
// It must be assigned a value at the point of declaration.

const x =  [1,2];
x[1] = 44;
console.log(x)

let a = [1,2,3];
a = a.concat(4, 1); // a is used as an immutable variable.
console.log(a)