import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');  
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      setMessage(error.response.data.message || 'Error registering user.');
    }
  };

  return (
    <div className="register-page">
      <div className="background-shapes">
        <div className="shape-one"></div>
        <div className="shape-two"></div>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
