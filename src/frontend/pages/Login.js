import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';   

const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, formData);
               console.log("Login Response:", res.data);
            localStorage.setItem('token', res.data.token);

            // this is store name in localstoareg for accessing it to show user name at navbar 
        localStorage.setItem('user', JSON.stringify( res.data.user));

            setIsLoggedIn(true);
            navigate('/home');
        } catch (error) {
            alert(error.response?.data?.msg || 'Login Error');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
                <br/>
                {/* <button type="button" onClick={() => navigate('/forgot-password')}>forgot password</button> */}
                  <a href="/forgot-password">Forgot Password?</a>
            </form>
        </div>
    );
};

export default Login;
