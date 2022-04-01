// A non-local variable is a variable defined in an outer function
// In javascript, a non-primitive function argument is also non-local
// since it is copied by reference and therefore can be modified by the inner function
// with the changes affecting the referenced variable.
// Non-local variables can be given new values in the inner function.

function tree() {
    let m = 0;
    function trunk() {
        m = 4; // m is non-local. its not local and not global.
    }
    trunk();
    console.log(m)
}

tree();

function changeFirst(arr) { // arr is a non-local parameter
    arr[0] = 0;
}
let ar = [123,42,4]
changeFirst(ar);
console.log(ar)
let a2 = [5, 2, 3];
changeFirst([...a2]); // prevent surprise by providing a reference copy instead.
console.log(a2);