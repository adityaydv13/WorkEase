import { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`, { email });
      setMessage(res.data.msg || 'Password reset link sent!');
      // navigate('/reset-password');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="register-container">
        <h2 className="register-title">Forgot Password</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Send Reset Link</button>
        </form>
        {message && <p style={{ marginTop: '20px', color: '#555' }}>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
