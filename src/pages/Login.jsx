// src/pages/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset any existing errors
    resetErrors();

    // Basic validation
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Clear inputs after successful login
      setEmail('');
      setPassword('');
      navigate('/encrypt-decrypt'); // Redirect after successful login
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset error states
  const resetErrors = () => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);
  };

  // Email validation function using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function using regex
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle authentication errors
  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
        setError('No user found with this email.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password. Please try again.');
        break;
      default:
        setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-lg bg-gray-100 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      {error && <p className="text-red-600 text-center" aria-live="polite">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className={`border p-2 w-full ${emailError ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!emailError}
            aria-describedby="emailError"
          />
          {emailError && <p id="emailError" className="text-red-600 mt-2">{emailError}</p>}
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`border p-2 w-full ${passwordError ? 'border-red-500' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!passwordError}
            aria-describedby="passwordError"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
            onClick={() => setShowPassword(prevState => !prevState)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {passwordError && <p id="passwordError" className="text-red-600 mt-2">{passwordError}</p>}
        </div>

        <button 
          className={`bg-cyan-500 text-white p-2 w-full rounded hover:bg-cyan-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="text-cyan-500 hover:underline">
          Forgot Password?
        </Link>
        <p className="mt-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-cyan-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
