// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-lg bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          className="border p-2 w-full mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
          Reset Password
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
