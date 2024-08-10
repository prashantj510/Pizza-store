import React, { useState } from 'react';
// import "./Signup.css";
import { setUsers } from '../Data/user';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Add more conditions like regex for a stronger password
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

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      // Proceed with registration
      const user = setUsers(email, password);
      if (user) {
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
      } else {
        // Handle registration failure
      }
    }
  };

  return (
    <div className='signup-container flex justify-center items-center min-h-screen p-4 bg-gray-20 '>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-green-400 dark:border-green-800 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Create Your Account
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            Join us, it's free and only takes a minute.
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
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-green-500 dark:focus:border-green-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-green-400"
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
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-green-500 dark:focus:border-green-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-green-400"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
            </div>
            <div className="mt-6">
              <label
                className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                placeholder="••••••••"
                className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-green-500 dark:focus:border-green-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-green-400"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && <p className="text-red-600 mt-2">{confirmPasswordError}</p>}
            </div>
            <div className="mt-10">
              <button
                className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-green-600 to-teal-600 rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-800"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-green-200 dark:bg-zinc-800">
          <div className="text-sm text-green-900 dark:text-green-300 text-center">
            Already have an account?
            <Link to='/login'>Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
