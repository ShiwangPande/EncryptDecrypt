// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaKey, FaFolder, FaSync } from 'react-icons/fa'; // Importing icons

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/encrypt-decrypt'); // Navigate to the encrypt/decrypt page
  };

  return (
    <div 
      className="container mx-auto mt-10 p-5 bg-gray-50 rounded-lg shadow-lg"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc1M3wwfDF8c2VhcmNofDJ8fGJsdXUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTY3MjQzNjEyOQ&ixlib=rb-4.0.3&q=80&w=1080")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
        <h1 className="text-5xl font-bold text-center text-cyan-800">Welcome to the Encrypt/Decrypt App</h1>
        <p className="mt-4 text-center text-lg text-gray-700">Secure your messages easily.</p>
        
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-semibold text-cyan-600">Get Started</h2>
          <p className="mt-2 text-gray-600">
            This application allows you to encrypt and decrypt your messages securely.
            Whether you want to send sensitive information or just want to learn about encryption, you're in the right place!
          </p>
          
          <button
            onClick={handleGetStarted}
            className="mt-4 bg-cyan-600 text-white p-3 rounded-lg hover:bg-cyan-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Encrypting/Decrypting
          </button>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-cyan-600">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300">
              <FaLock className="text-4xl text-cyan-600 mx-auto" />
              <h3 className="mt-2 text-lg font-semibold text-center">Secure Encryption</h3>
              <p className="text-gray-600 text-center">Utilize advanced algorithms to secure your data.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300">
              <FaKey className="text-4xl text-cyan-600 mx-auto" />
              <h3 className="mt-2 text-lg font-semibold text-center">Easy to Use</h3>
              <p className="text-gray-600 text-center">A user-friendly interface for seamless operation.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300">
              <FaFolder className="text-4xl text-cyan-600 mx-auto" />
              <h3 className="mt-2 text-lg font-semibold text-center">Store Messages</h3>
              <p className="text-gray-600 text-center">Save your encrypted messages safely.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300">
              <FaSync className="text-4xl text-cyan-600 mx-auto" />
              <h3 className="mt-2 text-lg font-semibold text-center">Easy Decryption</h3>
              <p className="text-gray-600 text-center">Decrypt your messages effortlessly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
