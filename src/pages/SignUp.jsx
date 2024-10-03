// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const SignUp = () => {
  // State for form fields and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  // Handle form submission and user sign up
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset error states before validation
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    // Validate email and password
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
      );
      return;
    }

    // Try to create the user with Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/encrypt-decrypt'); // Redirect after successful signup
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // Handle specific Firebase errors for better feedback
  const handleFirebaseError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setEmailError('Email already in use');
        break;
      case 'auth/weak-password':
        setPasswordError('Password is too weak');
        break;
      default:
        setError('Failed to sign up. Please try again.');
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSignUp}>
        {/* Email Input Field */}
        <div className="mb-4">
          <input
            type="email"
            aria-label="Email"
            placeholder="Email"
            className={`border p-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-red-600 mt-2">{emailError}</p>}
        </div>

        {/* Password Input Field */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            aria-label="Password"
            placeholder="Password"
            className={`border p-2 w-full rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account? <a href="/login" className="text-cyan-500 hover:underline">Log in here</a>
      </p>
    </div>
  );
};

export default SignUp;
