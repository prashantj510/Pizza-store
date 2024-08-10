import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Debugging output
  console.log('Cart Data:', cart);
  console.log('Total Amount:', getTotal());

  const handleBackToHome = () => {
    clearCart(); // Clear the cart
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white bg-opacity-80 min-h-screen">
      <div className="mb-6 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-green-600 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold mb-4">Order Received</h1>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        {cart.length === 0 ? (
          <p className="text-xl font-bold">No items in cart.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
              <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
        <div className="mt-6 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Total:</h2>
          <span className="text-2xl font-bold">${getTotal()}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleBackToHome}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
