function f1() {
    let z = 'my f1';
}

function f2() {
    let y = 'my f2';
    f1();
}

function f3() {
    let x = 'my f3';
    f2();
}

f3();