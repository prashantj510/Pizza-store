import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardNumber(value.match(/.{1,4}/g)?.join('-') || '');
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiry(value.match(/.{1,2}/g)?.join('/') || '');
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value.substring(0, 3));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isExpiryValid(expiry)) {
      // Redirect to Order Confirmation page without clearing the cart
      navigate('/order-confirmation');
    }
  };

  // Validate expiry input
  const isExpiryValid = (expiry) => {
    if (!expiry || expiry.length !== 5) return false; // Ensure expiry is defined and has the correct length
    const [mm, yy] = expiry.split('/');
    const month = parseInt(mm, 10);
    return (
      mm.length === 2 &&
      yy.length === 2 &&
      month >= 1 &&
      month <= 12
    );
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white bg-opacity-80 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6">Payment</h1>
      <div className="w-full max-w-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-xl font-bold">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                </div>
                <span className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-6 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Total:</h2>
              <span className="text-2xl font-bold">${getTotal()}</span>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md 63">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength="19" // Allow for the 16 digits plus dashes
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="expiry" className="block text-gray-700">Expiry (MM/YY)</label>
            <input
              type="text"
              id="expiry"
              value={expiry}
              onChange={handleExpiryChange}
              className="w-full p-2 border border-gray-300 rounded"
              maxLength="5" // Allow for MM/YY plus the slash
              placeholder="MM/YY"
            />
            {!isExpiryValid(expiry) && expiry.length === 5 && (
              <p className="text-red-500 text-sm">Invalid expiry date</p>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="cvv" className="block text-gray-700">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              className="w-full p-2 border border-gray-300 rounded"
              maxLength="3" // Only allow 3 digits for CVV
              placeholder="CVV"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
