// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaKey, FaFolder, FaSync } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/encrypt-decrypt');
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-50 flex items-center justify-center px-6"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.9)',
      }}
    >
      {/* Glassmorphism Card */}
      <div className="relative max-w-5xl w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-cyan-800 leading-tight">
            Welcome to DRM
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Secure your messages with ease and precision.
          </p>
        </div>

        {/* Get Started Section */}
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-semibold text-cyan-600">
            Get Started
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Our encryption tools are designed to safeguard your information. Whether you are encrypting sensitive data or decrypting messages, you're in the right place.
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full hover:shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-transform duration-300 transform hover:scale-105"
          >
            Start Encrypting/Decrypting
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-cyan-600 text-center mb-6">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaLock className="text-4xl text-cyan-600 mx-auto" />}
              title="Secure Encryption"
              description="Powerful algorithms to ensure maximum security."
            />
            <FeatureCard
              icon={<FaKey className="text-4xl text-cyan-600 mx-auto" />}
              title="Easy to Use"
              description="Designed with simplicity and efficiency in mind."
            />
            <FeatureCard
              icon={<FaFolder className="text-4xl text-cyan-600 mx-auto" />}
              title="Store Messages"
              description="Keep encrypted messages safe and organized."
            />
            <FeatureCard
              icon={<FaSync className="text-4xl text-cyan-600 mx-auto" />}
              title="Quick Decryption"
              description="Access decrypted content in an instant."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
    {icon}
    <h3 className="mt-4 text-lg font-semibold text-center">{title}</h3>
    <p className="text-gray-600 text-center mt-2">{description}</p>
  </div>
);

export default Home;
