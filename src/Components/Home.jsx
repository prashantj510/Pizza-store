import React, { useEffect, useState } from 'react';
import pizzas from './../Assets/Menu.json';
import pizz from './../Assets/pizza.png';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the hook
import { isUserLoggedIn, getLoggedInUser,logout } from '../Services/UserAuthService';

const HomePage = () => {
  const { addToCart } = useCart(); // Get the addToCart function
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = isUserLoggedIn();
  const user = isLoggedIn ? getLoggedInUser() : null; // Get user details if logged in

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    
  },[])

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://harperspizza.co.uk/wp-content/uploads/2023/08/pizza.png')" }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-black bg-opacity-50">
        <div className="text-white text-2xl font-bold">
          <img src={pizz} alt="Pizza Logo" className="h-10 inline-block mr-2" />
          Pizz
        </div>
        <div className="space-x-4 flex items-center">
          {!isLoggedIn && <Link to='Login'><button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition">Login</button></Link>}
          <Link to='cart'><button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition">Cart</button></Link>
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white bg-gray-800 rounded-full h-10 w-10 hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">User Profile</span>
                {/* User profile icon */}
                <img src={pizz} alt="User Profile" className="h-8 w-8 rounded-full" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <div className="p-4">
                    <div className="font-bold text-gray-700">{user?.name}</div>
                    <div className="text-gray-500">{user?.email}</div>
                  </div>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-bounce pt-6">Welcome To</h1>
      </div>

      {/* Pizza Menu Overlay */}
      <div className="top-30 left-0 right-0 bottom-0 flex items-center justify-center bg-grey bg-opacity-60 p-10">
        <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-screen-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pizzas.map((pizza) => (
              <div key={pizza.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <img src={pizza.imageUrl} alt={pizza.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
                <p className="text-gray-700 mb-4">{pizza.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${pizza.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(pizza)} 
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
