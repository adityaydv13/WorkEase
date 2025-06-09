import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
   
  const { token } = useParams();
//    console.log('Token:', token);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
    // const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      setMsg(res.data.msg);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Reset failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="register-container">
        <h2 className="register-title">Reset Password</h2>
        <form className="register-form" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Update Password</button>
        </form>
        {msg && <p style={{ marginTop: '20px', color: '#555' }}>{msg}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
