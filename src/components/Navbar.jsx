import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link to="/" className="hover:text-gray-300">My App</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-300 hover:text-gray-400 focus:outline-none"
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link>
            {user ? (
              <button onClick={handleLogout} className="block p-2 hover:bg-gray-700 rounded">Logout</button>
            ) : (
              <Link to="/login" className="block p-2 hover:bg-gray-700 rounded">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
