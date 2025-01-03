import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Get the email from the previous page

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, { email, password });
      setMessage('Password reset successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Set New Password</h2>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleResetPassword}
          className="mt-4 w-full bg-green-600 text-white font-semibold rounded-md h-10 hover:bg-green-700 transition duration-200"
        >
          Reset Password
        </button>

        <p className="mt-4 text-sm text-red-600">{message}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
