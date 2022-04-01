const o = {
    one: 1,
    two: 2
}

function three(outer) {
    return outer.one + outer.two;
}

console.log(three(o));
