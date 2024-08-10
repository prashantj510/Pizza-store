import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the hook
import pizz from './../Assets/pizza.png';
import { isUserLoggedIn, getLoggedInUser, logout } from '../Services/UserAuthService';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart(); // Get functions from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = isUserLoggedIn();
  const user = isLoggedIn ? getLoggedInUser() : null; // Get user details if logged in

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const incrementQuantity = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decrementQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://harperspizza.co.uk/wp-content/uploads/2023/08/pizza.png')" }}>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-black bg-opacity-50">
        <Link to='/'><div className="text-white text-2xl font-bold">
          <img src={pizz} alt="Pizza Logo" className="h-10 inline-block mr-2" />
          Pizz
        </div></Link>
        <div className="space-x-4 flex items-center">
          {!isLoggedIn && <Link to='/Login'><button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition">Login</button></Link>}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center bg-gray-800 rounded-full h-10 w-10 hover:bg-gray-700 focus:outline-none"
              >
                <span className="sr-only">User Profile</span>
                <img src={pizz} alt="User Profile" className="h-8 w-8 rounded-full" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-min bg-white border border-gray-200 rounded shadow-lg">
                  <div className="p-4 flex ">
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

      {/* Cart Content */}
      <div className="flex-grow flex flex-col justify-center items-center text-center p-6 bg-white bg-opacity-80">
        <h1 className="text-4xl font-extrabold mb-6">Your Cart</h1>
        <div className="w-full max-w-screen-lg">
          {cart.length === 0 ? (
            <p className="text-xl font-bold">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => decrementQuantity(item.id, item.quantity)} 
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l focus:outline-none"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-gray-200 text-gray-700">{item.quantity}</span>
                      <button 
                        onClick={() => incrementQuantity(item.id, item.quantity)} 
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-6 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Total:</h2>
                <span className="text-2xl font-bold">${getTotal()}</span>
              </div>
              <div className="mt-6 flex justify-center">
                <Link to="/payment">
                  <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition">Proceed to Checkout</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
