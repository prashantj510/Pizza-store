import usersData from './user.json';

// This will store the users data in-memory
let users = [...usersData]; // Use a copy of the imported data

export function getUsers() {
    return users;
}
export function getUserById(id) {
    return users.find(x=> x.id = id);
}
export function checkIfUserExist(username,password) {
    let user = users.find(x=> (x.username === username && x.password === password));
    delete user.password;
    return user;
}
export function setUsers(user) {
    users.push(user);
}

