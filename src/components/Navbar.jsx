// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = ({ user }) => { // Receive user as prop
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold hover:text-yellow-400 transition duration-300" aria-label="Go to Home">
          App
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link 
                to="/encrypt-decrypt" 
                className="mr-4 hover:text-yellow-400 transition duration-300" 
                aria-label="Go to Encrypt-Decrypt Page"
              >
                Encrypt-Decrypt
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="mr-4 hover:text-yellow-400 transition duration-300" 
                aria-label="Go to Login Page"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="mr-4 hover:text-yellow-400 transition duration-300" 
                aria-label="Go to Sign Up Page"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
