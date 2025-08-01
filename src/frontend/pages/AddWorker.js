 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddWorker.css';

import {
  FaUser, FaPhone, FaMapMarkerAlt, FaTools, FaCalendarAlt, FaSun, FaMoon
} from 'react-icons/fa';

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    workertype: '',
    availability: '',
    status: 'active',
  });

  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode from localStorage on page load
    return localStorage.getItem('darkMode') === 'true';
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });




const handleSubmit = async (e) => {
  e.preventDefault();

  // Modern check for geolocation support
  if (!("geolocation" in navigator)) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const dataToSend = {
          ...formData,
          latitude,
          longitude,
        };

        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/addworker`,
          dataToSend,
          config
        );

        if (res.data.worker?._id) {
          localStorage.setItem("workerId", res.data.worker._id);
          console.log("Worker ID saved to localStorage:", res.data.worker._id);
        } else {
          alert("Worker ID not returned from server");
        }

        alert(res.data.msg);
        setFormData({
          name: '',
          phone: '',
          address: '',
          workertype: '',
          availability: '',
          status: 'active',
        });
        navigate('/home');
      } catch (error) {
        alert(error.response?.data?.message || 'Error adding worker');
      }
    },
    (error) => {
      console.error("Location error:", error);
      alert("Please allow location access to register as a worker.");
    }
  );
};


  return (
    <div className={`add-worker-container ${darkMode ? 'dark' : ''}`}>
      <form className="add-worker-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2 className="form-title">Add Yourself as a Worker</h2>
          <button
            type="button"
            className="toggle-mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="input-icon">
          <FaUser className="icon" />
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
        </div>

        <div className="input-icon">
          <FaPhone className="icon" />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        </div>

        <div className="input-icon">
          <FaMapMarkerAlt className="icon" />
          <input name="address" placeholder="Address" onChange={handleChange} required />
        </div>

        <div className="input-icon">
          <FaTools className="icon" />
          {/* <input name="workertype" placeholder="Skills (e.g. Carpenter)" onChange={handleChange} required /> */}
         <select name="workertype" onChange={handleChange} required>
            <option value="">Select Skill</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Mason">Mason</option>
            <option value="Painter">Painter</option>
            <option value="Gardener">Gardener</option>
            <option value="Welder">Welder</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Driver">Driver</option>
            <option value="ac-mech">AC-Mech</option>
            <option value="developer">Software Developer</option>
            <option value="farm-work">farmer</option>
            <option value="artist">Artist</option>
            <option value="other">other</option>
            </select>
        

        </div>

        <div className="input-icon">
          <FaCalendarAlt className="icon" />
          <input name="availability" placeholder="Availability (e.g. 5 Days)" onChange={handleChange} required />
        </div>

        <select name="status" onChange={handleChange} value={formData.status} required>
          <option value="active">Active</option>
          <option value="inactive">Not Active</option>
        </select>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddWorker;
