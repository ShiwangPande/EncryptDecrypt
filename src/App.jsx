// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EncryptDecrypt from './pages/EncryptDecrypt';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Home from './pages/Home'; // Import the Home component

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once user state is determined
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Center loading indicator
  }

  return (
    <Router>
  
        <Navbar user={user} handleLogout={() => { setUser(null); }} /> {/* Pass user state and handleLogout to Navbar */}
  
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route 
          path="/encrypt-decrypt" 
          element={
            <ProtectedRoute user={user}>
              <EncryptDecrypt />
            </ProtectedRoute>
          } 
        />

        {/* Route for the Home page */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
