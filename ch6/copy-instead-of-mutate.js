// 4.
// Copy instead of mutate strategy for objects

function updateLastLogin(user) {
    let newUserRec = Object.assign({}, user);
    newUserRec.lastLogin = Date.now();
    return newUserRec;
}

const u1 = { name: 'time', email: 'a@k.com', pass: '55' }
const u2 = updateLastLogin(u1);

console.log(u1)
console.log(u2)