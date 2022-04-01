// 'use strict'
const a = [1, { n: 10 }]

// both a and b are frozen
const d = Object.freeze(a);
const b = d;
a[0] = 3;
a[1]['n'] = 5;
b[0] = 8;
b[1]['n'] = 111;

console.log(a,  b)
