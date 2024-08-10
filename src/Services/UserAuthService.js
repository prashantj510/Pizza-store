


const isUserLoggedIn = () => {
   const isUserLogedIn = Boolean(window.localStorage.getItem("isLoggedIn"));
    return isUserLogedIn;
}

const getLoggedInUser = () => {
    const user = JSON.parse(window.localStorage.getItem("user"));
     return user;
 }

 const logout = () => {
     window.localStorage.clear()
 }

 export {isUserLoggedIn,getLoggedInUser,logout}