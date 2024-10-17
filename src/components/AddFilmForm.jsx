import React, { useState } from 'react';
import { addFilms } from '../services/ApiServices';

const AddFilmForm = ({ onClose }) => {
  const [film, setFilm] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image') {
      setImage(files[0]);
    } else if (name === 'video') {
      setVideo(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', film.title);
    formData.append('director', film.director);
    formData.append('releaseYear', film.releaseYear);
    formData.append('genre', film.genre);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      await addFilms(formData); 
      console.log('Film ajouté avec succès');
      onClose();  
    } catch (error) {
      console.error('Erreur lors de l’ajout du film:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Ajouter un Film</h2>
      <input
        type="text"
        name="title"
        placeholder="Titre"
        value={film.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="director"
        placeholder="Réalisateur"
        value={film.director}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="releaseYear"
        placeholder="Année de sortie"
        value={film.releaseYear}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={film.genre}
        onChange={handleChange}
        required
      />

      <label>Image du Film :</label>
      <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

      <label>Bande-Annonce ou Vidéo :</label>
      <input type="file" name="video" accept="video/*" onChange={handleFileChange} />

      <button type="submit">Ajouter Film</button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
};

export default AddFilmForm;
