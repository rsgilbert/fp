// Filter out values from a list 

function filter(predicateFn, arr) {
    let result = [];
    for(let [idx, el] of arr.entries()) {
        if(predicateFn(el, idx, [...arr])) {
            result = [...result, el]
        }
    }
    return result;
}

const arr = ['mark', 'tomas', 'maella']

const beginsWithM = (v, idx, arr) => {
    console.log(idx, arr)
    return v[0] === 'm';
}
const mArr = filter(beginsWithM, arr);
console.log(mArr);