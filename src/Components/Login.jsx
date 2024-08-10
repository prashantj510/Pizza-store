import React, { useState } from 'react';
import "./Login.css";
import {checkIfUserExist,} from '../Data/user'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // You can add more conditions like regex for a stronger password
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Proceed with form submission or authentication
     let user =  checkIfUserExist(email,password)
     if(user) {
        window.localStorage.setItem("isLoggedIn",true);
        window.localStorage.setItem("user",JSON.stringify(user));
        navigate('/');
     }
     else {
        // user does not exist , not a valid user 

     }
    }
  };

  return (
    <div className='login-container flex justify-center items-center min-h-screen p-4 bg-gray-20 '>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Welcome Back!
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            We missed you, sign in to continue.
          </p>
          <div className="mt-10">
            <div className="relative">
              <label
                className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                placeholder="you@example.com"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-600 mt-2">{emailError}</p>}
            </div>
            <div className="mt-6">
              <label
                className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                placeholder="••••••••"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
            </div>
            <div className="mt-10">
              <button
                className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                type="submit"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
          <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
            Don't have an account?
            {/* <a className="font-medium underline" href="#">Sign up</a> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
