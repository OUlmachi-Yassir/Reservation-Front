import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../auth.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');  
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login', 
        formData
      );
  
      console.log('Réponse de l\'API :', response.data); 
  
      const { token, role ,_id} = response.data;
  
      if (!token || !role) {
        throw new Error('Token ou rôle manquant dans la réponse');
      }
  
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId',_id);
  
      console.log('Rôle stocké dans localStorage :', role); 
  
      if (role === 'admin') {
        navigate('/dashboardAdmin');
      } else {
        navigate('/');
      }
  
      setMessage('Login successful!');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setMessage(error.response?.data?.message || 'Error logging in.');
    }
  };
  

  return (
    <div className="login-page">
      <div className="background-shapes">
        <div className="shape-one"></div>
        <div className="shape-two"></div>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

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
          Login
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
