// bundling data with its behaviour - encapsulation

function person(name, age) {
    return function happyBirthday() { // has closure over name and age so its functionality can access the state
        age++;
        console.log(`Happy birthday ${name}. You are now ${age} years old`);
        return person(name, age);
    }
}

const hbd = person('Jeff', 10);
const hbd2 = hbd();
const hbd3 = hbd2();

// Achieve above using this binding to an object

const birthdayBoy = {
    name: 'Menya',
    age: 18,
    happyBirthday() {
        console.log(`Happy ${++this.age} birthday, ${this.name}`)
    },
    hbd2(boy) {
        console.log(`hbd ${boy.name}, your ${++boy.age}th`);
    }
}

birthdayBoy.happyBirthday();
birthdayBoy.happyBirthday();
birthdayBoy.hbd2(birthdayBoy);
birthdayBoy.hbd2(birthdayBoy);