// with closure state is declared at author time and you cannot add or remove
// properties to/from the state.
// The inner function closes over variables in the outer function and thus
// makes them stay around after the outer function has exited.
function outer() {
    let one = 1
    let two = 2;
    return function inner() { return one + two; }
}

const three = outer();
console.log(three());