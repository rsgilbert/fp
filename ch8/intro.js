function f1(x) {
    if(x < 5) return x;
    console.log(x);
    return f1(x / 2);
}

console.log(f1(25));