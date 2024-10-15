import React, { useState } from 'react';
import { updateFilm } from '../services/ApiServices';

const EditFilmForm = ({ film, onClose }) => {
  const [formData, setFormData] = useState({ ...film });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFilm(film._id, formData);
    onClose();
  };

  return (
    <div className="modal" style={{
      position:"fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "300px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      zIndex: 1000,
      display: "block",
    }}>
      <h3>Edit Film</h3>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="director" value={formData.director} onChange={handleChange} />
        <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
        <input name="genre" value={formData.genre} onChange={handleChange} />
        <button type="submit">Save</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditFilmForm;
