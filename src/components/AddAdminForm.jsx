import React, { useState } from 'react';
import { addAdmin } from '../services/ApiServices';

const AddAdminForm = ({ onClose , setAdmins }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAdmin(formData);
      setAdmins((prevAdmins) => [...prevAdmins, response.data.admin]);
      onClose ();
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  return (
    <div>
      <h3>Add New Admin</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Add Admin</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddAdminForm;
