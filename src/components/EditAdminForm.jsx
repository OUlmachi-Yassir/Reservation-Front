import React, { useState } from 'react';
import { updateAdmin } from '../services/ApiServices';

const EditAdminForm = ({ admin, setEditingAdmin, setAdmins }) => {
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAdmin(admin._id, formData);
      setAdmins((prevAdmins) =>
        prevAdmins.map((adm) =>
          adm._id === admin._id ? response.data.admin : adm
        )
      );
      setEditingAdmin(null); 
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  return (
    <div>
      <h3>Edit Admin</h3>
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
          placeholder="New Password (optional)"
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => setEditingAdmin(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditAdminForm;
