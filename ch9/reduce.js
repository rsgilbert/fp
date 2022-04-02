// reduction

const arr = [5, 10, 20,1 ]
// const sum = arr.reduce(function(acc, v) {
//     console.log(acc, v)
//     return acc + v;
// });

// console.log(sum) // 36

function reduce(reducerFn, initialValue, arr) {
    if(initialValue == undefined || initialValue == null) {
        initialValue = arr[0];
        arr = arr.slice(1);
    }
    let result = initialValue;
    for(let [idx, el] of arr.entries()) {
        result = reducerFn(result, el, idx);
    }
    return result;
}

const ar1 = [2, 5, 10, 20]
function prodReducer(acc, v, idx) { 
    console.log(acc, v, idx)
    return acc * v;
}
// const prod = reduce(prodReducer, 1, ar1);
// console.log(prod); // 2_000

// const prod2 = reduce(prodReducer, undefined, ar1);
// console.log(prod2)

// implementing map usinng reduce
function map(mapFn, arr) {
    return arr.reduce(function reducer(acc, val, idx) {
        return [...acc, mapFn(val, idx)]
    }, []);
}

const plus3 = v => v + 3;
const ar5 = [2, 4, 6, 8];
// console.log(map(plus3, ar5))


// implementing filter using reduce
function filter(predicateFn, arr) {
    return arr.reduce(function reducer(acc, val, idx) {
        return predicateFn(val, idx) ? [...acc, val] : [...acc]
    }, [])
}

const isEven = v => v % 2 == 0;

const evens = filter(isEven, [1,2,3,4,5,6,7,8,9,10]);
console.log(evens)


