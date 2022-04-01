// Spirit of value immutability. 
// We can mutate the array but we choose not to
function addValue(arr, nv) {
    let newArr = [...arr, nv];
    return newArr;
}

let a1 = [1, 4, 5]
let a2 = addValue(a1, 10);
console.log(a1)
console.log(a2)

