import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPass() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('Verify your identity to change your password.');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5001/send-otp', { email });
      setOtpSent(true);
      setMessage('Enter the OTP sent to your email.');
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5001/verify-otp', { email, otp });
      setMessage('OTP verified successfully!');
      navigate('/resetpass', { state: { email } }); // Redirect to ResetPassword page with email
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Reset Password</h2>
        
        <p className="text-gray-600 font-medium mb-6">{message}</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
          <button
            onClick={handleSendOtp}
            className="mt-4 w-full bg-blue-600 text-white font-semibold rounded-md h-10 hover:bg-blue-700 transition duration-200"
          >
            Send OTP
          </button>
        </div>

        {otpSent && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOtp}
              className="mt-4 w-full bg-green-600 text-white font-semibold rounded-md h-10 hover:bg-green-700 transition duration-200"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPass;
