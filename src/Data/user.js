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
// export function setUsers(user) {
//     users.push(user);
// }

export const setUsers = (email, password) => {
    // Assuming users are stored in local storage for this example
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the user already exists
    if (users.some(user => user.email === email)) {
      return false; // User already exists
    }
    
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser; // Return the new user object if registration is successful
  };
  