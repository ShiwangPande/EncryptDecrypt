// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const actionCode = searchParams.get('oobCode'); // The reset code from URL

    if (!actionCode) {
      setError('Invalid or missing reset code.');
      return;
    }

    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      setMessage('Password has been reset successfully!');
      setError('');
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-lg bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="bg-cyan-500 text-white p-2 w-full rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
