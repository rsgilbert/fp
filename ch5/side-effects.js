"use strict"
// Side effects
// See: https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch5.md/#chapter-1-why-functional-programming

// Cause and effect
function foo(x) {
    return x * 2;
}

// var y = foo(3)
// var y = 3;
// console.log(y)

// Cause and effect are disjoint
// The effect is indirect.
// Setting y in this way is what we call a side-effect.
function f2(x) {
    y = 22;
}
var y;
f2(50)
// console.log(y)


// Side causes
// Some of the causes that contribute to the effect output of 
// a function are not clear and cannot be found out without first
// inspecting the function's implementation carefully.
function f3(x) {
    return x + z;
}

var z = 10
// console.log(f3(2))

z = 85
// console.log(f3(2))

// Referencing free variables
// Not a side cause because its not my practise of mine to
// overwrite variables for functions to be other functions.
// f5 is not part of the state of the program (f4). It is fixed.
function f4(x) {
    return x + f5(x)
}

function f5(x) {
    return x * 3
}

// console.log(f4(3))

let PI = 3.14

// Using PI is not a side cause
// f6(10) will always return the save value
// inlining the value of PI will not change the program.
// There is no part of this program that relies on being 
// able to change the value of PI.
function f6(x) {
    return x * PI;
}

console.log(f6(4))

// Randomness is a side cause 
function myId() {
    return Math.random()
}
console.log(myId())

// I/O Effects
// Input is a side cause
// Output is a side effect

// Side bugs

let users = {}
let userOrders = {}

function fetchUserData(userId) {
    fetch('http://users/userId', function onUserData(user) {
        users[userId] = user;
    })
}

function fetchOrders(userId) {
    fetch('http://orders/userId', function onOrders(orders) {
        for(let order of orders) {
            // keep a reference to latest order for each user
            users[userId].latestOrder = order;
            userOrders[order.orderId] = order;
        }
    })
}

function deleteOrder(orderId) {
    let user = users[userOrders[orderId].userId]; 
    let isLatestOrder = (userOrders[orderId] === user.latestOrder)

    // deleting the latest order for a user?
    if(isLatestOrder) {
        hideLatestOrderDisplay();
    }

    fetch('http:/order/delete/orderId', function onDelete(success) {
        if(success) {
            // deleted the latest order for a user?
            if(isLatestOrder) {
                user.latestOrder = null;
            }
            userOrders[orderId] = null;
        }
        else if(isLatestOrder) {
            showLatestOrderDisplay();
        }
    })
}

// Idempotence

function updateCounter(obj) {
    if(obj.count < 10) {
        obj.count++;
        return true;
    }
    return false;
}

// Mathematical idempotence
// f(x) === f(f(x))
// An operation whose output wont ever change after the first call, if you
// feed that output into the operation over and over again
// Restricting side effects to idempotent operations is much better
// than unrestricted updates
// console.log(Math.abs(Math.abs(Math.abs(-4))))
// console.log(Math.min(Math.min(Math.min(Math.min(5.23, 11.2)))))
// console.log(Math.round(Math.round(Math.round(Math.round(-0.5)))))
// console.log(Math.ceil(Math.ceil(-0.5)))

// idempotent mathematical calculations
const toPower0 = x => Math.pow(x, 0)
// console.log(toPower0(11))
// console.log(toPower0(toPower0(toPower0(-1.2))))

// Primitive type coercion is also idempotent
// console.log(String(String(String('alpha'))))
// console.log(Number(Number(Number(1.1))))

// The `identity` fp tool is also idempotent
const { identity } = require('../ch3/func-inputs')
// console.log(identity(4))
// console.log(identity(identity(identity(4))))

// Certain string operations are also naturally idempotent
// console.log('degree'.toUpperCase().toUpperCase().toUpperCase())

// We can even design more sophisticated string formating operations 
// in an idempotent way
function currency(val) {
    let num = parseFloat(
        String(val).replace(/[^\d.-]+/g, '')
    )
    let sign = (num < 0) ? '-' : ''
    return `${sign}$${Math.abs(num).toFixed(2)}`
}

// console.log(currency(-3.2124))
// console.log(currency(currency(currency(currency(52.1388)))))



// Programming Idempotence
// f(x) === f(x); f(x);

// idempotent
let obj = new Object()
obj.count = 2;
let a = [2, 4]
a[a.length - 1] = 42;
let person = 'green'
console.log('person', person)
const personToUpper = () => person = person.toUpperCase()
personToUpper()
console.log('person', person)
personToUpper()
console.log('person', person)
personToUpper()
console.log('person', person)


// non-idempotent
let k = Math.random()
obj.count ++;
let b = []
b[b.length] = 45
b[b.length] = 45
let o = {}
o.lastUpdated = Date.now()
console.log(b, 'length', b.length)