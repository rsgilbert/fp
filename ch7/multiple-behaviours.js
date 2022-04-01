// object version
const person = {
    firstName: 'Mwela',
    lastName: 'Jackson',
    first() { return this.firstName; },
    last() { return this.lastName;}
}


// using closure to represent multiple behaviour
function createPerson(firstName, lastName) {
    function first(){ return firstName; }
    function last() { return lastName; }
    return function API(name, arg) {
        switch(name) {
            case 'first': return first();
            case 'last': return last();
            case 'setFirstName': setFirstName(arg);
        }
    }
    function setFirstName(nm){
        firstName = nm;
    }
}

const api = createPerson('Jane', 'Onesmus')
console.log(api('first'))
console.log(api('last'))
api('setFirstName', 'Joan')
console.log(api('first'))