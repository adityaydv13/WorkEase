 

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/login`,
                formData
            );

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
 
            setIsLoggedIn(true);
            navigate('/home');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.msg || 'Login Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? <span className="spinner"></span> : 'Login'}
                </button>
                <br />
                <a href="/forgot-password">Forgot Password?</a>
            </form>
        </div>
    );
};

export default Login;
