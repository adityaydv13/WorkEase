import React, { useState } from 'react';
import axios from 'axios';
import '../styles/contactform.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-query`, form);
      if (res.data.success) {
        setStatus('Query sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send query.');
      }
    } catch (error) {
      setStatus('Error sending query.');
    }
  };

 return (
  <form className="contact-form" onSubmit={handleSubmit}>
    <h2>Send Us a Message</h2>
    <input
      className="form-input"
      name="name"
      placeholder="Your Name"
      value={form.name}
      onChange={handleChange}
      required
    />
    <input
      className="form-input"
      name="email"
      type="email"
      placeholder="Your Email"
      value={form.email}
      onChange={handleChange}
      required
    />
    <textarea
      className="form-textarea"
      name="message"
      placeholder="Your Message"
      value={form.message}
      onChange={handleChange}
      required
    />
    <button className="form-button" type="submit">Send Query</button>
    <p className="form-status">{status}</p>
  </form>
);

};

export default ContactForm;
