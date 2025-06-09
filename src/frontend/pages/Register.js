// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/register.css'; // Add this import
// function Register() {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
// const res = await axios.post('http://localhost:5000/api/register', formData);
//       alert(res.data.msg || 'Registration Successful');
//       navigate('/login');
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Registration Error');
//     }
//   };

//  return (
//   <div className="page-wrapper">
//     <div className="register-container">
//       <h2 className="register-title">Create Your Account</h2>
//       <form className="register-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           onChange={handleChange}
//           required
//           className="register-input"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           onChange={handleChange}
//           required
//           className="register-input"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//           className="register-input"
//         />
        
//         <button type="submit" className="register-button">Register</button>
//       </form>
//     </div>
//   </div>
// );

// }

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [profileImage, setProfileImage] = useState(null); // New state for file
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      if (profileImage) data.append('profileImage', profileImage); // Attach image


      // const res = await axios.post('http://localhost:5000/api/register', data, {
      const res=  axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(res.data.msg || 'Registration Successful');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.msg || 'Registration Error');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="register-container">
        <h2 className="register-title">Create Your Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="register-input"
          />

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
