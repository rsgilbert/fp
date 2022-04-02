let x = 2, y;

// transformation/projection
y = x * 3;

// reassignment
x = x * 2;

// mapping/transformer function
const multBy3 = v => v * 3
let z = multBy3(8);
console.log(z)

function map(mapperFn, arr) {
    const newList = Array(arr.length);
    // console.log(newList)
    for(let [idx, v] of arr.entries()) {
        newList[idx] = mapperFn(v, idx); // we avoided newList.push because it has side effects
    }
    return newList;
}

const namesLower = ['mark', 'simon', 'peter'];

const toUpper = v => v.toUpperCase();

const namesUpper = map(toUpper, namesLower);
console.log(namesUpper);


function map2(mapperFn, arr) {
    const result = [];
    for (let el of arr) {
        result = [...result, mapperFn(el)]
    }
    return result;
}

const numbers = [1, 10, 100, 1000];
const doubles = map(x => x * 2, numbers);
console.log(doubles)