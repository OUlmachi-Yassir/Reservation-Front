import React, { useState } from 'react';
import { updateFilm } from '../services/ApiServices';

const EditFilmForm = ({ film, onClose,onUpdate }) => {
  const [formData, setFormData] = useState({
    title: film.title,
    director: film.director,
    releaseYear: film.releaseYear,
    genre: film.genre,
    image: null,  
    video: null,  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] }); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData(); 
    updatedData.append('title', formData.title);
    updatedData.append('director', formData.director);
    updatedData.append('releaseYear', formData.releaseYear);
    updatedData.append('genre', formData.genre);

    if (formData.image) {
      updatedData.append('image', formData.image); 
    }
    if (formData.video) {
      updatedData.append('video', formData.video); 
    }

    await updateFilm(film._id, updatedData); 
    onUpdate();
    onClose();
  };

  return (
    <div className="modal" style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "auto",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      zIndex: 1000,
      display: "block",
    }}>
      <h3>Edit Film</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Director:
          <input name="director" value={formData.director} onChange={handleChange} />
        </label>
        <label>
          Release Year:
          <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
        </label>
        <label>
          Genre:
          <input name="genre" value={formData.genre} onChange={handleChange} />
        </label>
        
        <label>
          Image:
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        </label>

        <label>
          Video:
          <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditFilmForm;
