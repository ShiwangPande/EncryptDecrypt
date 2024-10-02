// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li>
            <Link className="text-white" to="/">Home</Link>
          </li>
          <li>
            <Link className="text-white" to="/encrypt-decrypt">Encrypt/Decrypt</Link>
          </li>
          <li>
            <Link className="text-white" to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link className="text-white" to="/signin">Sign In</Link>
          </li>
          <li>
            <Link className="text-white" to="/forgot-password">Forgot Password</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
