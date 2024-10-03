// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setError(''); // Clear error if successful
    } catch (error) {
      setError('Failed to send password reset email. Please check your email.');
      setMessage(''); // Clear message if error
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-lg bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-cyan-500 text-white p-2 w-full rounded">Send Reset Email</button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-cyan-500 hover:underline">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
