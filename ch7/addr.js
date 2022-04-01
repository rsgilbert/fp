// represent address using nested closure
let person = {
    name: 'Gilbert',
    address: {
        city: 'Kla',
        town: 'JS Street'
    }
}

// using closure 
function individual() {
    const name = 'Gilbo';

    function middle() {
        // nested closure
        return function inner() {
            const city = 'Kamp';
            const town = 'City Square';
            return [name, [city, town]];
        }
    }
    return middle();
}

const ind = individual();
console.log(ind())



